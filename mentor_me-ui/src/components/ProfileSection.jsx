import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import Trie from "../TrieDataStructure.js";
import data from "../FormData.json";

const ProfileSection = () => {
  const [school, setSchool] = useState("");
  const [schoolSuggestions, setSchoolSuggestions] = useState([]);

  const [major, setMajor] = useState("");
  const [majorSuggestions, setMajorSuggestions] = useState([]);

  const [accountType, setAccountType] = useState("");
  const [accountTypeSuggestions, setAccountTypeSuggestions] = useState([]);

  const [classification, setClassification] = useState("");
  const [classificationSuggestions, setClassificationSuggestions] = useState(
    []
  );

  const [bio, setBio] = useState("");

  const schoolTrie = new Trie();
  const majorTrie = new Trie();
  const accountTypeTrie = new Trie();
  const classificationTrie = new Trie();

  // With the data from the JSON file, populate the corresponding Trie
  useEffect(() => {
    populateTries();
  });

  const populateTries = () => {
    const { majors, schools, accountTypes, classifications } = data;
    schools.forEach((word) => schoolTrie.insert(word));
    majors.forEach((word) => majorTrie.insert(word));
    accountTypes.forEach((word) => accountTypeTrie.insert(word));
    classifications.forEach((word) => classificationTrie.insert(word));
  };

  const handleAutocomplete = (inputValue, field) => {
    let suggestions = [];
    switch (field) {
      case "school":
        setSchool(inputValue);
        suggestions = schoolTrie.search(inputValue);
        console.log(suggestions);
        setSchoolSuggestions(suggestions);
        break;
      case "major":
        setMajor(inputValue);
        suggestions = majorTrie.search(inputValue);
        console.log(suggestions);
        setMajorSuggestions(suggestions);
        break;
      case "accountType":
        setAccountType(inputValue);
        suggestions = accountTypeTrie.search(inputValue);
        console.log(suggestions);
        setAccountTypeSuggestions(suggestions);
        break;
      case "classification":
        setClassification(inputValue);
        suggestions = classificationTrie.search(inputValue);
        console.log(suggestions);
        setClassificationSuggestions(suggestions);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event, field) => {
    const inputValue = event.target.value;
    handleAutocomplete(inputValue, field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          school,
          major,
          accountType,
          classification,
          bio,
        }),
      });
      if (response.ok) {
        const newProfile = await response.json();
        console.log("New profile created: ", newProfile);
      } else {
        console.error("Failed to create profile");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setSchool("");
    setMajor("");
    setAccountType("");
    setClassification("");
    setBio("");
  };

  return (
    <div className="profile-section">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => handleInputChange(e, "school")}
          />
          {schoolSuggestions.length > 0 && (
            <ul>
              {schoolSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setSchool(suggestion);
                    setSchoolSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => handleInputChange(e, "major")}
          />
          {majorSuggestions.length > 0 && (
            <ul>
              {majorSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setMajor(suggestion);
                    setMajorSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <input
            type="text"
            id="accountType"
            value={accountType}
            onChange={(e) => handleInputChange(e, "accountType")}
          />
          {accountTypeSuggestions.length > 0 && (
            <ul>
              {accountTypeSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setAccountType(suggestion);
                    setAccountTypeSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="classification">Classification:</label>
          <input
            type="text"
            id="classification"
            value={classification}
            onChange={(e) => handleInputChange(e, "classification")}
          />
          {classificationSuggestions.length > 0 && (
            <ul>
              {classificationSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => {
                    setClassification(suggestion);
                    setClassificationSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileSection;
