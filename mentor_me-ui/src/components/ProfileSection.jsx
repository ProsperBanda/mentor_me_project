import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import Trie from "../TrieDataStructure.js";
import data from "../FormData.json";
import { useNavigate } from "react-router-dom";

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
  const maxSuggestions = 5;
  const schoolTrie = new Trie();
  const majorTrie = new Trie();
  const accountTypeTrie = new Trie();
  const classificationTrie = new Trie();
  const isNewWord = (word, trie) => {
    return word && !trie.search(word).includes(word);
  };

  const addNewWordToJSON = async (word, field) => {
    try {
      const response = await fetch("http://localhost:3000/update-words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field,
          word,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Failed to add word to JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNewWord = (word, field) => {
    switch (field) {
      case "school":
        schoolTrie.insert(word);
        break;
      case "major":
        majorTrie.insert(word);
        break;
      case "accountType":
        accountTypeTrie.insert(word);
        break;
      case "classification":
        classificationTrie.insert(word);
        break;
      default:
        break;
    }
  };

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
        setSchoolSuggestions(suggestions);
        break;
      case "major":
        setMajor(inputValue);
        suggestions = majorTrie.search(inputValue);
        setMajorSuggestions(suggestions);
        break;
      case "accountType":
        setAccountType(inputValue);
        suggestions = accountTypeTrie.search(inputValue);
        setAccountTypeSuggestions(suggestions);
        break;
      case "classification":
        setClassification(inputValue);
        suggestions = classificationTrie.search(inputValue);
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const reset = () => {
      setSchool("");
      setMajor("");
      setAccountType("");
      setClassification("");
      setBio("");
    };
    e.preventDefault();

    if (!"Notification" in window) {
      alert("This browser does not support notifications.");
    } else {
      Notification.requestPermission().then(function (permission) {
        localStorage.setItem("notificationPermission", permission);
      });
    }

    try {
      if (isNewWord(school, schoolTrie)) {
        addNewWord(school, "school");
        addNewWordToJSON(school, "schools");
      }

      if (isNewWord(major, majorTrie)) {
        addNewWord(major, "major");
        addNewWordToJSON(major, "major");
      }

      if (isNewWord(classification, classificationTrie)) {
        addNewWord(classification, "classification");
        addNewWordToJSON(classification, "classification");
      }
      let userId = localStorage.getItem("id");
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
          userId,
        }),
      });
      if (response.ok) {
        const newProfile = await response.json();

        const destination = accountType === "Mentor" ? "/mentor" : "/mentee";
        navigate(destination);
      } else {
        console.error("Failed to create profile");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    reset();
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
            <ul className="dropdown-menu">
              {schoolSuggestions.slice(0, maxSuggestions).map((suggestion) => (
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
            <ul className="dropdown-menu">
              {majorSuggestions.slice(0, maxSuggestions).map((suggestion) => (
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
          <select
            id="accountType"
            className="account-type-select"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="Mentor">Mentor</option>
            <option value="Mentee">Mentee</option>
          </select>
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
            <ul className="dropdown-menu">
              {classificationSuggestions
                .slice(0, maxSuggestions)
                .map((suggestion) => (
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
