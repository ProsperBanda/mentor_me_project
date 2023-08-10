import React, { useEffect } from "react";
import { socket } from "../client.js";
import axios from "axios";
import "./Notifications.css";

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

  const handleNotificationClick = async (notificationID) => {
    try {
      await axios.put(
        `http://localhost:3000/notifications/${notificationID}/read`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notificationID ? { ...n, status: "Read" } : n
        )
      );
    } catch (error) {
      console.error("Failed to update notification status:", error);
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
        <p
          key={notification.id}
          className={notification.status === "Read" ? "read-notification" : ""}
          onClick={() => handleNotificationClick(notification.id)}
        >
          Notification {index + 1}: {notification.content},{" "}
          {userType === "mentor" ? "from" : "by"} {notification.sender.username}
        </p>
      ))}
    </div>
  );
};

export default Notifications;
