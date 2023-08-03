import React, { useState } from "react";
import "./Sidebar.css";
import Notifications from "./MenteeNotifications";
import Chat from "./Chat";

const SideBar = () => {
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
    <div className="sidebar">
      <button className="sidebar-button" onClick={handleChatClick}>
        Chat
      </button>
      <button className="sidebar-button" onClick={handleNotificationsClick}>
        Notifications
      </button>
      <button className="sidebar-button">Requests</button>
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

export default SideBar;
