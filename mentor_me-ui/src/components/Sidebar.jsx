import React, { useState } from "react";
import "./Sidebar.css";
import Notifications from "./MenteeNotifications";

const SideBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="sidebar">
      <button className="sidebar-button">Chat</button>
      <button className="sidebar-button" onClick={handleNotificationsClick}>
        Notifications
      </button>
      <button className="sidebar-button">Requests</button>
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

export default SideBar;
