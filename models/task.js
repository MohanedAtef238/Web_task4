const { DataTypes } = require('sequelize');
const sequelize = require('../database');// Import the connection
const User = require('./User')
// following the documentation and your provided code i made IDs for both tables and included the "references" keyword to make sure a relationship is established
// https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships -> documentation link
// i also took a sneak peak at the implementation for many to many which showed me how to reference
const Task = sequelize.define(
  'Task',
  {
    T_id: { type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true },
    Tname: { type: DataTypes.STRING, allowNull: false },
    task_description: {type: DataTypes.STRING, allowNull: false},
    userID: { type: DataTypes.INTEGER, allowNull: false,
      references: {model: User,key: 'userid',},
  }}, 
  {
    timestamps: false,
  }
);
// https://sequelize.org/docs/v6/core-concepts/assocs/#defining-the-sequelize-associations
User.hasMany(Task, { foreignKey: 'userID' }); 
Task.belongsTo(User, { foreignKey: 'userID' });
module.exports = Task;
