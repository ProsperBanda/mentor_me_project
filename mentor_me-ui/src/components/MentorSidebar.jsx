import React, { useState } from "react";
import "./MentorSidebar.css";
import Notifications from "./MentorNotifications";
import Chat from "./Chat";

const MentorSideBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(!showChat);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="mentor-sidebar">
      <button className="sidebar-button" onClick={handleChatClick}>
        Chat
      </button>
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
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      )}
      {showChat && (
        <div className="chat-popup">
          <button className="back-arrow" onClick={handleChatClick}>
            ⬅
          </button>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default MentorSideBar;
