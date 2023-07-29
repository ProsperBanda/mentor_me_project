import React, { useState } from "react";
import axios from "axios";
import { socket } from "../client.js";

const MentorCard = ({ mentor }) => {
  const username = mentor.username;
  const { school, major, classification, bio } = mentor.userprofile;

  const [requestStatus, setRequestStatus] = useState("Request");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleMentorshipRequest = async () => {
    try {
      const menteeID = localStorage.getItem("id");
      const response = await axios.post("http://localhost:3000/request", {
        mentorID: mentor.id,
        menteeID: menteeID,
      });
      if (response.status === 201) {
        setRequestStatus("Pending");
        setButtonDisabled(true);
        console.log("Mentorship request sent successfully!");

        //Notify that a request has been sent
        socket.emit("new_request", { mentorID: mentor.id, menteeID: menteeID });
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
