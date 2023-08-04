import React from "react";
import MenteeGrid from "./MenteeGrid";
import "./MentorDashboard.css";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

const MentorDashboard = () => {
  return (
    <div className="mentor-dashboard">
      <main>
        <NavBar />
        <Sidebar userType="mentor" />
        <MenteeGrid />
      </main>
    </div>
  );
};

export default MentorDashboard;
