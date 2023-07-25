import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { userProfile } from "./userProfile.js";

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
userProfile.hasMany(mentorshipRequest);
mentorshipRequest.belongsTo(userProfile, { foreignKey: "userId" });
// mentorshipRequest.belongsTo(userProfile, { foreignKey: "MentorID" });

export default mentorshipRequest;
