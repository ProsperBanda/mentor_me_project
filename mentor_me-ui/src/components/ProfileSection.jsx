import React, { useState } from "react";
import "./ProfileSection.css";

const ProfileSection = () => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [accountType, setAccountType] = useState("");
  const [classification, setClassification] = useState("");
  const [bio, setBio] = useState("");

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
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <input
            type="text"
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="classification">Classification:</label>
          <input
            type="text"
            id="classification"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          />
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
