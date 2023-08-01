import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../client.js";
import emailjs from "@emailjs/browser";

const MenteeCard = ({ mentee }) => {
  const { id, Status, username, school, major, classification, bio } = mentee;
  const [menteeEmail, setMenteeEmail] = useState(null);
  const notificationPermissionStatus = localStorage.getItem(
    "notificationPermission"
  );
  const [menteeName, setMenteeName] = useState(null);
  const mentor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Get all user profiles and find the mentee's email
    axios
      .get("http://localhost:3000/userprofile")
      .then((response) => {
        const menteeInfo = response.data.find(
          (profile) => profile.user.id === id
        );
        if (menteeInfo) {
          setMenteeEmail(menteeInfo.user.email);
          setMenteeName(menteeInfo.user.username);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, [mentee]);

  const handleAcceptRequest = async () => {
    const mentorName = mentor.username;
    try {
      const mentorID = localStorage.getItem("id");
      await axios.post(`http://localhost:3000/${id}/accept`);
      if (notificationPermissionStatus === "granted") {
        socket.emit("request_accepted", { mentorID: mentorID, menteeID: id });
      } else {
        // Email Notification
        const templateParams = {
          to_email: menteeEmail,
          to_name: menteeName,
          from_name: mentorName,
          message: "Your request was accepted!",
        };
        emailjs.send(
          "service_z1dfdc9",
          "template_rdszj91",
          templateParams,
          "2Q2IGBHUMYxrj09BR"
        );
      }
    } catch (error) {
      console.error("Error accepting mentorship request:", error);
    }
  };
  const handleDeclineRequest = async () => {
    try {
      await axios.post(`http://localhost:3000/${id}/decline`);
    } catch (error) {
      console.error("Error declining mentorship request:", error);
    }
  };
  return (
    <div className="mentee-card">
      <img src="" alt="Mentee" />
      <h3>{username}</h3>
      <p>bio: {bio}</p>
      <p>Major: {major}</p>
      <p>School: {school}</p>
      <p>Status: {Status}</p>
      <p>Classification: {classification}</p>
      {Status === "Pending" && (
        <>
          <button onClick={handleAcceptRequest}>Accept</button>
          <button onClick={handleDeclineRequest}>Decline</button>
        </>
      )}
    </div>
  );
};

export default MenteeCard;
