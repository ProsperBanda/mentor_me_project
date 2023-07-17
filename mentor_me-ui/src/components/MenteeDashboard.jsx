import React, { useState } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import SideBar from "./Sidebar";
import MentorGrid from "./MentorGrid";
import "./MenteeDashboard.css";

const MenteeDashboard = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");

  const handleMajorChange = (selectedOption) => {
    setSelectedMajor(selectedOption);
  };

  const handleClassificationChange = (selectedOption) => {
    setSelectedClassification(selectedOption);
  };

  return (
    <main>
      <NavBar />
      <Search />
      <SideBar
        selectedMajor={selectedMajor}
        selectedClassification={selectedClassification}
        onMajorChange={handleMajorChange}
        onClassificationChange={handleClassificationChange}
      />
      <div className="dashboard-content">
        <MentorGrid />
      </div>
    </main>
  );
};

export default MenteeDashboard;
