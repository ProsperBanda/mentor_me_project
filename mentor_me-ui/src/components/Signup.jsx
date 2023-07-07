import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import SignupValidation from "./SignupValidation";

function Signup() {
  const [values, setValues] = useState({
    password: "",
    email: "",
    name: "",
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
    setErrors(SignupValidation(values));
  };

  return (
    <div className="content">
      <h1>Sign Up</h1>
      <p className="welcome">Enter your information below</p>
      <div className="user-information">
        <form action="" onSubmit={handleSubmit}>
          <div className="user-name">
            <label htmlFor="name">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
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
            Sign up
          </button>
          <p>You agree to our terms and policies</p>
          <Link to="/" className="login-btn">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
