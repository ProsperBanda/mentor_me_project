import React, { useEffect, useState } from "react";
import MenteeCard from "./MenteeCard";
import "./MenteeGrid.css";
import axios from "axios";

const MenteeGrid = () => {
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const mentorID = localStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentorshipRequests = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          `http://localhost:3000/mentorship-requests?mentorID=${mentorID}`
        );
        setMentorshipRequests(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching mentorship requests:", error);
        setIsLoading(false);
      }
    };
    fetchMentorshipRequests();
  }, []);
  return (
    <div className="mentee-grid">
      {isLoading
        ? Array(9)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="mentee-card placeholder"></div>
            ))
        : mentorshipRequests.map((request) => {
            const { Status, id, User } = request;
            const { username, email, userprofile } = User;
            const { school, major, classification, bio, imageUrl } =
              userprofile;
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
                  imageUrl,
                }}
              />
            );
          })}
    </div>
  );
};

export default MenteeGrid;
