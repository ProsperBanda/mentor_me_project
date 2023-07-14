import React from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import SideBar from "./Sidebar";
import MentorGrid from "./MentorGrid";
import "./MenteeDashboard.css";

const MenteeDashboard = () => {
  return (
    <main>
      <NavBar />
      <Search />
      <SideBar />
      <div className="dashboard-content">
        <MentorGrid />
      </div>
    </main>
  );
};

export default MenteeDashboard;
