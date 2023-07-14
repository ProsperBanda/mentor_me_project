import React from "react";
import MenteeCard from "./MenteeCard";
import "./MenteeGrid.css";

const MenteeGrid = () => {
  //Todo: map the MenteeCards onto the MenteeGrid
  return (
    <div className="mentee-grid">
      <MenteeCard />
      <MenteeCard />
      <MenteeCard />
      <MenteeCard />
      <MenteeCard />
      <MenteeCard />
    </div>
  );
};

export default MenteeGrid;
