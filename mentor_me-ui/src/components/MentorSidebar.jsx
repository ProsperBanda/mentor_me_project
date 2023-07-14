import React from "react";
import "./MentorSidebar.css";

const MentorSideBar = () => {
  return (
    <div className="mentor-sidebar">
      <button className="sidebar-button">Chat</button>
      <button className="sidebar-button">Notifications</button>
      <button className="sidebar-button">Requests</button>
      <button className="sidebar-button">Meetings</button>
    </div>
  );
};

export default MentorSideBar;
