import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = { username, password ,email};
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      window.localStorage.setItem("token",data.data.accessToken)
      navigate('/feed');
    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div className="log">
      <img src={logo} alt="" className="logo" />
      <i className="fa-solid fa-pencil"></i>
      <h1 className="h1">WELCOME BACK!</h1>
      <h3 className="h3">Please enter your details to Sign-in</h3>
      <div className="details-card">
        <div className="detail">
          <div className="Username">
            <h5 className="h5">Username</h5>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              className="input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="Username">
            <h5 className="h5">Email</h5>
            <input
              type="text"
              placeholder="Enter your name"
              value={email}
              className="input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <h5 className="h5">Password</h5>
            <input
              type="password"
              placeholder="Enter your password here"
              className="input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="click">
          <button className="button" onClick={handleSubmit}>
            SIGN-IN
          </button>
          <h5 className="h5">
            New to Unilink? <Link to="/signup">Create an Account</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};
export default Login;
