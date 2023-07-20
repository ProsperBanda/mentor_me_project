import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { userProfile } from "./userProfile.js";

export const mentorshipRequest = sequelize.define("mentorshipRequest", {
  RequestID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Status: {
    type: DataTypes.ENUM("Accepted", "Declined", "Pending"),
    allowNull: false,
  },
});

//Associations
mentorshipRequest.belongsTo(userProfile, { foreignKey: "MenteeID" });
mentorshipRequest.belongsTo(userProfile, { foreignKey: "MentorID" });

export default mentorshipRequest;
