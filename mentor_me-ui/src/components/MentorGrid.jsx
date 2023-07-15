import React, { useEffect, useState } from "react";
import MentorCard from "./MentorCard";
import "./MentorGrid.css";
import axios from "axios";

const MentorGrid = ({ selectedMajor, selectedClassification }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userprofile");
        const data = response.data;
        console.log(data);

        // //Filter users based on the accountType to get mentors
        // const mentorData = data.filter((user) => user.accountType === "Mentor");
        // setMentors(mentorData);
        // console.log(mentorData);

        //Filter mentors based on selectedMajor and selectedClassification
        let filteredMentors = data.filter((mentor) => {
          if (selectedMajor && mentor.major !== selectedMajor) {
            return false;
          }
          if (
            selectedClassification &&
            mentor.classification !== selectedClassification
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
  }, [selectedMajor, selectedClassification]);

  return (
    <div className="mentor-grid">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorGrid;
