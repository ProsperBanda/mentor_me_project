import React from "react";

const MentorCard = ({ mentor }) => {
  const username = mentor.user.username;
  const { school, major, classification, bio } = mentor;
  return (
    <div className="mentor-card">
      <img src="" alt="Mentor" />
      <h3>{username}</h3>
      <p>bio: {bio}</p>
      <p>Major: {major}</p>
      <p>School: {school}</p>
      <p>Classification: {classification}</p>
      <button>Request</button>
    </div>
  );
};

export default MentorCard;
