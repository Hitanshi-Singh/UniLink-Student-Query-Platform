const asyncHandler = require("../utils/asynchandler.utils.js");
const ApiError = require("../utils/API_Error.js");
const { User } = require("../models/user.model.js");
const { Tag } = require("../models/tag.model.js");
const { Dept } = require("../models/dept.model.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
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

  const { fullName, email, username, password, dept, selectedTags } = req.body;

  // Validate fields
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
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
  const department = await Dept.findById({ dept_name: dept });
  if (!department) {
    department = await Dept.create(dept);
    await department.save();
  }

  const defaultProfileImageUrl =
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";
  const profileLocalPath =
    (req?.files?.profileImage && req.files.profileImage[0]?.path) || null;

  let profileImgUrl = defaultProfileImageUrl;

  if (profileLocalPath) {
    const profileImg = await uploadOnCloudinary(profileLocalPath);

    if (!profileImg) {
      throw new ApiError(400, "Profile picture upload failed");
    }

    profileImgUrl = profileImg.url;
  }

  const user = await User.create({
    fullName,
    profileImage: profileImgUrl,
    email,
    password,
    username: username.toLowerCase(),
    dept: department?._id,
    subscribedTags: [],
  });
  // Process and associate tags
  const tagIds = [];
  for (const tagName of selectedTags) {
    let tag = await Tag.findOne({ name: tagName });

    if (!tag) {
      // Tag doesn't exist, create it and associate the `createdBy` field
      tag = await Tag.create({
        name: tagName,
        createdBy: user._id, // Associate the tag with the currently registering user
      });
    }

    tagIds.push(tag._id); // Collect tag IDs to associate with the user
  }

  // Update the user's subscribed tags
  user.subscribedTags = tagIds;
  await user.save();
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Send response with created user and total upvotes
  return res
    .status(201)
    .json(
      new ApiResponse(200, { createdUser }, "User registered successfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
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

const getUserUpvotes = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Aggregate total upvotes from answers owned by the user
  const totalUpvotes = await Answer.aggregate([
    { $match: { owner: userId } }, // Filter answers by the user
    { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } }, // Sum upvotes
  ]);

  const total = totalUpvotes[0]?.totalUpvotes || 0;

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalUpvotes: total },
        "User's total upvotes fetched successfully",
      ),
    );
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

const updateUserDP = asyncHandler(async (req, res) => {
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
  updateAccountDetails,
  updateUserDP,
  getUserUpvotes,
};
