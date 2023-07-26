import React, { useEffect, useState } from "react";
import MenteeCard from "./MenteeCard";
import "./MenteeGrid.css";
import axios from "axios";

const MenteeGrid = () => {
  const [mentorshipRequests, setMentorshipRequests] = useState([]);

  useEffect(() => {
    //Fetch incoming mentorship request from the backend
    const fetchMentorshipRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/mentorship-requests"
        );
        console.log("Response:", response);
        setMentorshipRequests(response.data);
      } catch (error) {
        console.error("Error fetching mentorship requests:", error);
      }
    };
    fetchMentorshipRequests();
  }, []);
  return (
    <div className="mentee-grid">
      {mentorshipRequests.map((request) => {
        //Extract data
        const { Status, id, User } = request;
        const { username, email, userprofile } = User;
        const { school, major, classification, bio } = userprofile;
        return (
          <MenteeCard
            key={id}
            mentee={{
              Status,
              id,
              username,
              email,
              school,
              major,
              classification,
              bio,
            }}
          />
        );
      })}
    </div>
  );
};

export default MenteeGrid;
