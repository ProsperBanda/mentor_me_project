import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
import { socket } from "../client.js";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
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
        const loggedInUser = data.userData;
        localStorage.setItem("id", loggedInUser.id);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        updateUser(loggedInUser);

        socket.emit("user_connected", { userID: loggedInUser.id });
        let uid = loggedInUser.id;

        socket.on("mentor_online", (data) => {
          alert(`Your connected mentor ${data.mentorID} is now online!`);
        });
        socket.on("mentee_online", (data) => {
          alert(`Your connected mentee ${data.menteeID} is now online!`);
        });

        const profileCheckResponse = await fetch(
          `http://localhost:3000/profile/${loggedInUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (profileCheckResponse.ok) {
          const data = await profileCheckResponse.json();
          if (data.accountType === "Mentee") {
            navigate("/mentee");
          } else {
            navigate("/mentor");
          }
        } else {
          navigate("/home");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
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
