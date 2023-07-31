import React, { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  let storedUser = localStorage.getItem("user");
  storedUser = JSON.parse(storedUser);
  return (
    <nav>
      <div className="nav-content">
        <div className="profile-info">
          <img src="" alt="Profile" />
          <p>Welcome, {storedUser.username}</p>
        </div>
        <img src="" alt="logo" className="logo" />
      </div>
    </nav>
  );
};

export default NavBar;
