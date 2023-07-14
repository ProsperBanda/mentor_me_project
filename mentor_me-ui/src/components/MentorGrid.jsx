import React from "react";
import MentorCard from "./MentorCard";
import "./MentorGrid.css";

const MentorGrid = () => {
  //Todo: map the MentorCards onto the MentorGrid
  return (
    <div className="mentor-grid">
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
      <MentorCard />
    </div>
  );
};

export default MentorGrid;
