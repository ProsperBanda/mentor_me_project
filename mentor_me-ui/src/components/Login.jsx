import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import LoginValidation from "./LoginValidation";

function Login() {
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));
  };

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
      <p className="welcome">Enter your Email and Password</p>
      <div className="user-information">
        <form action="" onSubmit={handleSubmit}>
          <div className="user-email">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="user-password">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn-success">
            Log in
          </button>
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
