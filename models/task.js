const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the connection

const Task = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
    city: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
