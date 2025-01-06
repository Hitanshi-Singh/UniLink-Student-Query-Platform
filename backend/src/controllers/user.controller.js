const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const { User } = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/API_Response.js");
const jwt = require("jsonwebtoken");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images
  // upload them to cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password, stream, selectedTags } =
    req.body;

  // Validate fields
  if (
    [fullName, email, username, password, stream].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Process profile image
  const profileLocalPath = req.files?.profile[0]?.path;

  if (!profileLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const profileImage = await uploadOnCloudinary(profileLocalPath);

  if (!profileImage) {
    throw new ApiError(400, "Profile picture upload failed");
  }

  // Create user
  const user = await User.create({
    fullName,
    profileImage: profileImage?.url,
    email,
    password,
    username: username.toLowerCase(),
    stream, // Store selected stream
    subscribedTags: selectedTags, // Store the tags selected by the user (from the frontend)
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //  **Aggregating Sum of Upvotes for User**: To display the sum of upvotes across all answers for a user

  const getUserTotalUpvotes = async (userId) => {
    const totalUpvotes = await Answer.aggregate([
      { $match: { user: userId } }, // Match answers by userId
      { $group: { _id: "$user", totalUpvotes: { $sum: "$upvotes" } } }, // Sum up the upvotes
    ]);

    if (totalUpvotes.length === 0) {
      return 0; // No upvotes
    }

    return totalUpvotes[0].totalUpvotes;
  };

  //const totalUpvotes = await getUserTotalUpvotes(user._id);

  // Send response with created user and total upvotes
  return res
    .status(201)
    .json(
      new ApiResponse(200, { createdUser }, "User registered successfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const DPLocalPath = req.file?.path;

  if (!DPLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  //TODO: delete old image

  const newDP = await uploadOnCloudinary(DPLocalPath);

  if (!newDP.url) {
    throw new ApiError(400, "Error while uploading on profile pic");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: newDP.url,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile image updated successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
    updateAccountDetails
  };
  
