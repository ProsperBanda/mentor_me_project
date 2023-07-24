import { User } from "./user.js";
import { userProfile } from "./userProfile.js";

User.hasOne(userProfile, { as: "userprofile", foreignKey: "userId" });
userProfile.belongsTo(User, { as: "user", foreignKey: "userId" });

export { User, userProfile };
