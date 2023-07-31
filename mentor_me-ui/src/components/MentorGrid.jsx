import React, { useEffect, useState } from "react";
import MentorCard from "./MentorCard";
import "./MentorGrid.css";
import axios from "axios";

const MentorGrid = ({ selectedMajor, selectedClassification, searchQuery }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const menteeID = localStorage.getItem("id");
        const response = await axios.get("http://localhost:3000/mentors", {
          params: {
            menteeID,
            major: selectedMajor,
            classification: selectedClassification,
          },
        });
        const data = response.data;

        let filteredMentors = data.filter((mentor) => {
          if (
            (selectedMajor && mentor.userprofile.major !== selectedMajor) ||
            (selectedClassification &&
              mentor.userprofile.classification !== selectedClassification) ||
            (searchQuery &&
              !mentor.username
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
          ) {
            return false;
          }
          return true;
        });

        setMentors(filteredMentors);
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      }
    };
    fetchMentors();
  }, [selectedMajor, selectedClassification, searchQuery]);

  return (
    <div className="mentor-grid">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorGrid;
