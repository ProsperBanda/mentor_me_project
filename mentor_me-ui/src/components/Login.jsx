import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { socket } from "../client.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login API request
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;
        localStorage.setItem("id", loggedInUser.id);
        updateUser(loggedInUser);

        socket.emit("user_connected", { userID: loggedInUser.id });
        console.log("The ID: ", loggedInUser.id);
        let uid = loggedInUser.id;

        const response2 = await fetch(
          `http://localhost:3000/profile/${loggedInUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response2.ok) {
          const data = await response2.json();
          if (data.accountType === "Mentee") {
            navigate("/mentee");
          } else {
            navigate("/mentor");
          }
        } else {
          navigate("/home");
        }
      } else {
        // Handle the login failure case
        alert("Login failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
    }
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
        <form action="" onSubmit={handleLogin}>
          <div className="user-email">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
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
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
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
