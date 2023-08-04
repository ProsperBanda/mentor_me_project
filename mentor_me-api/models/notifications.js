import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { User } from "./user.js";

export const notifications = sequelize.define("notifications", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Unread",
  },
});

User.hasMany(notifications, {
  as: "receivedNotifications",
  foreignKey: "receivingUserID",
});
User.hasMany(notifications, {
  as: "sentNotifications",
  foreignKey: "sendingUserID",
});
notifications.belongsTo(User, {
  as: "receiver",
  foreignKey: "receivingUserID",
});
notifications.belongsTo(User, { as: "sender", foreignKey: "sendingUserID" });

export default notifications;
