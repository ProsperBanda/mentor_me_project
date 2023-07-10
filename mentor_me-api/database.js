import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('mentor_medatabase', 'mymentor_me', 'Themanhimself09!',{
    host:'localhost',
    dialect: 'postgres'
});