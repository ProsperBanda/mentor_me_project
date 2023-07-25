import React, { useState } from "react";
import axios from "axios";
// import { newUserObj } from "../../../mentor_me-api/routes/users.js";

const MentorCard = ({ mentor }) => {
  const username = mentor.username;
  const { school, major, classification, bio } = mentor.userprofile;

  const [requestStatus, setRequestStatus] = useState("Request");

  const handleMentorshipRequest = async () => {
    try {
      const menteeID = localStorage.getItem("id");
      // const menteeID = 1;
      console.log("MenteeID: ", menteeID);

      //Make the API call to send a mentorship request
      const response = await axios.post("http://localhost:3000/request", {
        mentorID: mentor.id,
        menteeID: menteeID,
      });

      //If request is succesful, update the status to "Pending"
      if (response.status === 201) {
        setRequestStatus("Pending");
        console.log("Mentorship request sent successfully!");
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
      <button onClick={handleMentorshipRequest}>{requestStatus}</button>
    </div>
  );
};

export default MentorCard;
