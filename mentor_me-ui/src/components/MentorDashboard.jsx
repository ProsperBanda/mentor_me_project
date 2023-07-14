import React from "react";
import MenteeGrid from "./MenteeGrid";
import "./MentorDashboard.css";
import MentorSideBar from "./MentorSidebar";
import NavBar from "./NavBar";

const MentorDashboard = () => {
  return (
    <div className="mentor-dashboard">
      <main>
        <NavBar />
        <MentorSideBar />
        <MenteeGrid />
      </main>
    </div>
  );
};

export default MentorDashboard;
