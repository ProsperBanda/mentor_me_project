import React, { useEffect } from "react";
import { socket } from "../client.js";
import axios from "axios";

const Notifications = ({ notifications, setNotifications }) => {
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
    const handleNewRequest = (data) => {
      console.log("DATA:", data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.notification,
      ]);
    };

    socket.on("new_request", handleNewRequest);

    // Clean up the listener when the component gets unmounted
    return () => {
      socket.off("new_request", handleNewRequest);
    };
  }, [setNotifications]);

  return (
    <div className="notifications-content">
      <h3>Notifications</h3>
      {notifications.map((notification, index) => (
        <p key={index}>
          Notification {index + 1}: {notification.content}, from{" "}
          {notification.sender.username}
        </p>
      ))}
    </div>
  );
};

export default Notifications;
