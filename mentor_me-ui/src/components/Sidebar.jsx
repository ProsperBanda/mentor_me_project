import React from "react";
import "./Sidebar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-button">Chat</button>
      <button className="sidebar-button">Notifications</button>
      <button className="sidebar-button">Requests</button>
    </div>
  );
};

export default SideBar;
