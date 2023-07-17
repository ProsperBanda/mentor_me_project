import React, { useState } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import SideBar from "./Sidebar";
import MentorGrid from "./MentorGrid";
import "./MenteeDashboard.css";

const MenteeDashboard = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMajorChange = (selectedOption) => {
    setSelectedMajor(selectedOption);
  };

  const handleClassificationChange = (selectedOption) => {
    setSelectedClassification(selectedOption);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <NavBar />
      <Search
        onSearch={handleSearch}
        selectedMajor={selectedMajor}
        selectedClassification={selectedClassification}
        onMajorChange={handleMajorChange}
        onClassificationChange={handleClassificationChange}
      />
      <SideBar />
      <div className="dashboard-content">
        <MentorGrid
          selectedMajor={selectedMajor}
          selectedClassification={selectedClassification}
          searchQuery={searchQuery}
        />
      </div>
    </main>
  );
};

export default MenteeDashboard;
