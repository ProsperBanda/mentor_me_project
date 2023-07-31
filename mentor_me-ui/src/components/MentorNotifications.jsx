import React, { useEffect } from "react";
import { socket } from "../client.js";

const Notifications = ({ notifications, setNotifications }) => {
  useEffect(() => {
    const handleNewRequest = (data) => {
      console.log("DATA:", data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.notification.content,
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
          Notification {index + 1}: {notification}
        </p>
      ))}
    </div>
  );
};

export default Notifications;
