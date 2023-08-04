import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { UserContext } from "../../UserContext.js";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
        localStorage.setItem("id", loggedInUser.id);
        setUsername("");
        setEmail("");
        setPassword("");

        updateUser(loggedInUser);

        // Navigate to the login page after successful signup
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Signup failed: " + error);
    }
  };

  return (
    <div className="wrapper">
      <div className="content">
        <h1>Sign Up ✍🏼</h1>
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
      <div className="image-container">
        <img
          src="https://www.genesecloud.academy/wp-content/uploads/2021/02/mentor-1.svg"
          alt="Mentorship"
        />
      </div>
    </div>
  );
}

export default Signup;
