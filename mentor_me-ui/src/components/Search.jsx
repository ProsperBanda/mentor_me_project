import React from "react";
import "./Search.css";

const Search = ({
  selectedMajor,
  selectedClassification,
  onMajorChange,
  onClassificationChange,
}) => {
  const handleMajorChange = (event) => {
    const selectedOption = event.target.value;
    onMajorChange(selectedOption);
  };

  const handleClassificationChange = (event) => {
    const selectedOption = event.tagert.value;
    onClassificationChange(selectedOption);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search mentors..." />
      <select value={selectedMajor} onChange={handleMajorChange}>
        <option value="">All Majors</option>
      </select>
      <select
        value={selectedClassification}
        onChange={handleClassificationChange}
      >
        <option value="">All Classifications</option>
      </select>
      <button>Search</button>
    </div>
  );
};

export default Search;
