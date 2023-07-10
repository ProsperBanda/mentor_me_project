import { DataTypes } from "sequelize";
import {sequelize} from "../database.js";

export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});