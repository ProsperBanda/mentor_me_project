import React, { useEffect } from "react";
import { socket } from "../client.js";

const Notifications = ({ notifications, setNotifications }) => {
  useEffect(() => {
    const handleAccept = (data) => {
      console.log("DATA:", data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.notification.content,
      ]);
    };

    // Listening to an event from the server
    socket.on("request_accepted", handleAccept);

    // Clean up the listener when the component is unmounted
    return () => {
      socket.off("new_request", handleAccept);
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
