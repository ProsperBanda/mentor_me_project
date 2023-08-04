import React from "react";
import "./Card.css";

const Card = ({
  image,
  username,
  bio,
  major,
  school,
  classification,
  children,
}) => (
  <div className="card">
    <img src={image || ""} alt={username} />
    <h3>{username}</h3>
    <p>Bio: {bio}</p>
    <p>Major: {major} 📚</p>
    <p>School: {school} 🎓🏫</p>
    <p>Classification: {classification} ✍🏼</p>
    {children}
  </div>
);

export default Card;
