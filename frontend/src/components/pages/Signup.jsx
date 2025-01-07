import "./signup.css";

import logo from "../../assets/profilepic.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { response } from "../../../../backend/src/app";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(logo);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subsTags, setSubsTags] = useState("");

  const handleProfileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setProfilePic(reader.result); // Update the displayed image
      };

      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  return (
    <div className="outer-container">
      <h1 className="h1">CREATE ACCOUNT</h1>
      <h3 className="h3">Join our community today!</h3>
      <div className="card">
        <div className="profile">
          <div className="pic" onClick={handleProfileClick}>
            <img src={profilePic} alt="Profile" />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="details">
          <div className="inputdiv">
            <h5 className="h5">Full Name</h5>
            <input
              className="input"
              type="text"
              placeholder="Enter your fullname"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="inputdiv">
            <h5 className="h5">Email</h5>
            <input
              className="input"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputdiv">
            <h5 className="h5">Username</h5>
            <input
              className="input"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="inputdiv">
            <h5 className="h5">Password</h5>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="inputdiv">
            <h5 className="h5">Subscribed Tags</h5>
            <input
              className="input"
              type="text"
              placeholder="tags"
              onChange={(e) => {
                setSubsTags(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="click-button">
          <button
            className="button"
            onClick={async () => {
               const response = await axios.post(
                "http://localhost:3000/api/users/register",
                {
                  fullName,
                  email,
                  username,
                  password,
                  subscribedTags: subsTags,
                }
              );
              console.log(response?.data?.message);
            }}
          >
            Sign up
          </button>
          <div className="alternate-sign-in">
            <div className="link">
              <h5 className="h5">
                Already have an account?{" "}
                <Link to="/login" className="a">
                  Click here
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
