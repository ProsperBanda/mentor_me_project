import React, { useEffect } from "react";
import { socket } from "../client.js";
import axios from "axios";

const Notifications = ({ userType, notifications, setNotifications }) => {
  const fetchNotifications = async () => {
    try {
      const userID = localStorage.getItem("id");
      const response = await axios.get(
        `http://localhost:3000/notifications/${userID}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const handleEvent = (eventName, data) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.notification,
      ]);
    };

    const event = userType === "mentor" ? "new_request" : "request_accepted";
    socket.on(event, handleEvent);

    return () => {
      socket.off(event, handleEvent);
    };
  }, [setNotifications]);

  return (
    <div className="notifications-content">
      <h3>Notifications</h3>
      {notifications.map((notification, index) => (
        <p key={index}>
          Notification {index + 1}: {notification.content},{" "}
          {userType === "mentor" ? "from" : "by"} {notification.sender.username}
        </p>
      ))}
    </div>
  );
};

export default Notifications;
