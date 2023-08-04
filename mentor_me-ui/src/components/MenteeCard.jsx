import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../client.js";
import emailjs from "@emailjs/browser";
import "./MenteeCard.css";

const MenteeCard = ({ mentee }) => {
  const { id, Status, username, school, major, classification, bio } = mentee;
  const [menteeEmail, setMenteeEmail] = useState(null);
  const notificationPermissionStatus = localStorage.getItem(
    "notificationPermission"
  );
  const [menteeName, setMenteeName] = useState(null);
  const mentor = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState(mentee.Status);
  const projectId = import.meta.env.VITE_REACT_APP_CE_PROJECT_ID;

  useEffect(() => {
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

  function createChat() {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        { usernames: [mentor.username, menteeName], is_direct_chat: true },
        {
          headers: {
            "Project-ID": projectId,
            "User-Name": username,
            "User-Secret": username,
          },
        }
      )
      .catch((e) => console.log("create chat error", e));
  }

  const handleAcceptRequest = async () => {
    const mentorName = mentor.username;
    try {
      const mentorID = localStorage.getItem("id");
      await axios.post(`http://localhost:3000/${id}/accept`);
      if (notificationPermissionStatus === "granted") {
        socket.emit("request_accepted", { mentorID: mentorID, menteeID: id });
      } else {
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
      setStatus("Accepted");
      createChat();
    } catch (error) {
      console.error("Error accepting mentorship request:", error);
    }
  };
  const handleDeclineRequest = async () => {
    try {
      await axios.post(`http://localhost:3000/${id}/decline`);
      setStatus("Declined");
    } catch (error) {
      console.error("Error declining mentorship request:", error);
    }
  };
  return (
    <div className="mentee-card">
      <img src="" alt="Mentee" />
      <h3>{username}</h3>
      <p>bio: {bio}</p>
      <p>Major: {major} 📚</p>
      <p>School: {school} 🎓🏫</p>
      <p>Status: {status}</p>
      <p>Classification: {classification} ✍🏼</p>
      {status === "Pending" && (
        <>
          <button onClick={handleAcceptRequest}>Accept</button>
          <button onClick={handleDeclineRequest}>Decline</button>
        </>
      )}
    </div>
  );
};

export default MenteeCard;
