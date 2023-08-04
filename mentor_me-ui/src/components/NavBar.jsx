import React, { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  let storedUser = localStorage.getItem("user");
  storedUser = JSON.parse(storedUser);
  return (
    <nav>
      <div className="nav-content">
        <div className="profile-info">
          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg"
            alt="Profile"
          />
          <p className="profile-text">Welcome, {storedUser.username}</p>
        </div>
        <img
          src="https://thumbs.dreamstime.com/z/mentor-icon-vector-illustration-white-background-vector-illustration-mentor-icon-vector-illustration-119860865.jpg?w=768"
          alt="logo"
          className="logo"
        />
      </div>
    </nav>
  );
};

export default NavBar;
