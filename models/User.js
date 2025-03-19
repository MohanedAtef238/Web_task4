const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the connection

const User = sequelize.define(
  'User',
  {
    userid: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    age: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
