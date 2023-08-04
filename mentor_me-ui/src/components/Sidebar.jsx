import React, { useState } from "react";
import "./Sidebar.css";
import Notifications from "./Notifications";
import Chat from "./Chat";

const Sidebar = ({ userType }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => setShowChat(!showChat);
  const handleNotificationsClick = () =>
    setShowNotifications(!showNotifications);

  return (
    <div className={userType + "-sidebar"}>
      <button className="sidebar-button" onClick={handleChatClick}>
        Chat
      </button>
      <button className="sidebar-button" onClick={handleNotificationsClick}>
        Notifications
      </button>
      {showNotifications && (
        <div className="notifications-popup">
          <button className="back-arrow" onClick={handleNotificationsClick}>
            ⬅
          </button>
          <Notifications
            userType={userType}
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

export default Sidebar;
