import React from "react";
import axios from "axios";
import { socket } from "../client.js";

const MenteeCard = ({ mentee }) => {
  const { id, Status, username, school, major, classification, bio } = mentee;
  console.log(mentee);

  const handleAcceptRequest = async () => {
    try {
      const mentorID = localStorage.getItem("id");

      //Send a request to the backend to accept mentorship request
      await axios.post(`http://localhost:3000/${id}/accept`);
      socket.emit("request_accepted", { mentorID: mentorID, menteeID: id });
    } catch (error) {
      console.error("Error accepting mentorship request:", error);
    }
  };
  const handleDeclineRequest = async () => {
    try {
      //Send request to the backend to decline mentorship request
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
