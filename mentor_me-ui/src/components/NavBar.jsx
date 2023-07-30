import React from "react";
import "./NavBar.css";

let storedUser = localStorage.getItem("user");
storedUser = JSON.parse(storedUser);
const NavBar = () => {
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
