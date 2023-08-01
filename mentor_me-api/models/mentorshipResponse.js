import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import mentorshipRequest from "./mentorshipRequest.js";
import { userProfile } from "./userProfile.js";

export const mentorshipResponse = sequelize.define("mentorshipResponse", {
  Status: {
    type: DataTypes.ENUM("Accepted", "Declined", "Pending"),
    allowNull: false,
  },
});
mentorshipResponse.belongsTo(mentorshipRequest, {
  foreignKey: "requestID",
});
mentorshipResponse.belongsTo(userProfile, { foreignKey: "MentorID" });

export default mentorshipResponse;
