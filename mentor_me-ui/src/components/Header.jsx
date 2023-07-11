import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header-content">
      <div className="profile">
        <img src="" alt="Profile" className="profile-picture" />
        <span className="welcome-text">Hello User</span>
      </div>
      <div className="logo">
        <img src="" alt="logo" />
      </div>
    </div>
  );
}

export default Header;
