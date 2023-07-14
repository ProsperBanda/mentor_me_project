import { User } from './user.js';
import {userProfile} from './userProfile.js';

User.hasOne(userProfile, { as:'userprofile', foreignKey: 'id' });
userProfile.belongsTo(User, {as:'user', foreignKey: 'id' });

export { User,userProfile };