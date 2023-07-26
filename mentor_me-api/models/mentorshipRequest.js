import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { User } from "./user.js";

export const mentorshipRequest = sequelize.define("mentorshipRequest", {
  Status: {
    type: DataTypes.ENUM("Accepted", "Declined", "Pending"),
    allowNull: false,
  },
  MentorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  MenteeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//Associations
User.hasMany(mentorshipRequest);
mentorshipRequest.belongsTo(User, { foreignKey: "MenteeID" });

export default mentorshipRequest;
