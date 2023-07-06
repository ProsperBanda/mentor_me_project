import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="content">
      <h1>Weclome to Mentor_Me, choose your account type</h1>
      <div className="account-type">
        <div className="mentor">
          <button className="mentor-btn" name="Mentor">
            Mentor
          </button>
        </div>
        <div className="mentee">
          <button className="mentee-btn" name="Mentee">
            Mentee
          </button>
        </div>
      </div>
      <p className="welcome">Enter your information below</p>
      <div className="user-information">
        <form action="">
          <div className="user-email">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input type="email" placeholder="Enter Email" />
          </div>
          <div className="user-password">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <button className="btn-success">Log in</button>
          <p>You agree to our terms and policies</p>
          <Link to="/signup" className="create-account-btn">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
