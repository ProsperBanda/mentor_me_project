import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import SignupValidation from "./SignupValidation";
import { UserContext } from "../../UserContext.js";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the signup API request
      const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;
        console.log("loggedInUser:", loggedInUser);
        console.log("Signup successful");
        localStorage.setItem("id", loggedInUser.id);
        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");

        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the login page after successful signup
        navigate("/");
      } else {
        // Handle signup failure case
        alert("Signup failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Signup failed: " + error);
    }
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
              value={username}
              name="name"
              onChange={(e) => setUsername(e.target.value)}
              required
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
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
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
