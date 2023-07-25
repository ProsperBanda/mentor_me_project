import React from "react";
import axios from "axios";

const MenteeCard = ({ request }) => {
  const handleAcceptRequest = async () => {
    try {
      //Send a request to the backend to accept mentorship request
      await axios.post("http://localhost:3000/:requestID/accept");
    } catch (error) {
      console.error("Error accepting mentorship request:", error);
    }
  };
  const handleDeclineRequest = async () => {
    try {
      //Send request to the backend to decline mentorship request
      await axios.post("http://localhost:3000/:requestID/decline");
    } catch (error) {
      console.error("Error declining mentorship request:", error);
    }
  };
  return (
    <div className="mentee-card">
      <img src="" alt="Mentee" />
      <h3>{request.mentee.username}</h3>
      <p>bio: {request.mentee.bio}</p>
      <p>Major: {request.mentee.major}</p>
      <p>School: {request.mentee.school}</p>
      <p>Status: {request.status}</p>
      <p>Classification: {mentee.classification}</p>
      {request.status === "Pending" && (
        <>
          <button onClick={handleAcceptRequest}>Accept</button>
          <button onClick={handleDeclineRequest}>Decline</button>
        </>
      )}
    </div>
  );
};

export default MenteeCard;
