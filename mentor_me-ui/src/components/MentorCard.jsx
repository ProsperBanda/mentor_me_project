import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../client.js";
import emailjs from "@emailjs/browser";

const MentorCard = ({ mentor }) => {
  const username = mentor.username;
  const { school, major, classification, bio } = mentor.userprofile;

  const [requestStatus, setRequestStatus] = useState(
    mentor.requestStatus || "Request"
  );
  const [isButtonDisabled, setButtonDisabled] = useState(
    mentor.requestStatus !== "Send Request"
  );

  const [mentorEmail, setMentorEmail] = useState(null);
  const [mentorName, setMentorName] = useState(null);
  const notificationPermissionStatus = localStorage.getItem(
    "notificationPermission"
  );
  const menteeID = localStorage.getItem("id");
  const mentee = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/userprofile")
      .then((response) => {
        const mentorInfo = response.data.find(
          (profile) => profile.user.id === mentor.id
        );
        if (mentorInfo) {
          setMentorEmail(mentorInfo.user.email);
          setMentorName(mentorInfo.user.username);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, [mentor]);

  const handleMentorshipRequest = async () => {
    try {
      const menteeName = mentee.username;
      const response = await axios.post("http://localhost:3000/request", {
        mentorID: mentor.id,
        menteeID: menteeID,
      });
      if (response.status === 201) {
        setRequestStatus("Pending");
        setButtonDisabled(true);
        if (notificationPermissionStatus === "granted") {
          socket.emit("new_request", {
            mentorID: mentor.id,
            menteeID: menteeID,
          });
        } else {
          const templateParams = {
            to_email: mentorEmail,
            to_name: mentorName,
            from_name: menteeName,
            message: "You have received a new mentorship request!",
          };
          emailjs.send(
            "service_z1dfdc9",
            "template_rdszj91",
            templateParams,
            "2Q2IGBHUMYxrj09BR"
          );
        }
      }
    } catch (error) {
      console.error("Failed to send mentorship request:", error);
    }
  };
  return (
    <div className="mentor-card">
      <img src="" alt="Mentor" />
      <h3>{username}</h3>
      <p>bio: {bio}</p>
      <p>Major: {major}</p>
      <p>School: {school}</p>
      <p>Classification: {classification}</p>
      <button onClick={handleMentorshipRequest} disabled={isButtonDisabled}>
        {requestStatus}
      </button>
    </div>
  );
};

export default MentorCard;
