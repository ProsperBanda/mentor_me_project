import React, { useState } from "react";
import "./Search.css";

const Search = ({
  selectedMajor,
  selectedClassification,
  onMajorChange,
  onClassificationChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState();

  const handleMajorChange = (event) => {
    const selectedOption = event.target.value;
    onMajorChange(selectedOption);
  };

  const handleClassificationChange = (event) => {
    const selectedOption = event.tagert.value;
    onClassificationChange(selectedOption);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search mentors..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={selectedMajor} onChange={handleMajorChange}>
        <option value="">All Majors</option>
        <option value="Accounting">Accounting</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Biology">Biology</option>
      </select>
      <select
        value={selectedClassification}
        onChange={handleClassificationChange}
      >
        <option value="">All Classifications</option>
        <option value="Sophomore">Sophomore</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
