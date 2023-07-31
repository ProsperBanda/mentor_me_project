import React, { useState } from "react";
import "./MentorSidebar.css";
import Notifications from "./MentorNotifications";

const MentorSideBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="mentor-sidebar">
      <button className="sidebar-button">Chat</button>
      <button className="sidebar-button" onClick={handleNotificationsClick}>
        Notifications
      </button>
      <button className="sidebar-button">Requests</button>
      <button className="sidebar-button">Meetings</button>
      {showNotifications && (
        <div className="notifications-popup">
          <button className="back-arrow" onClick={handleNotificationsClick}>
            ⬅
          </button>
          <Notifications />
        </div>
      )}
    </div>
  );
};

export default MentorSideBar;
