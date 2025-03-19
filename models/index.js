const sequelize = require('../database');
const User = require('./User');
const Task = require('./task');
module.exports = { sequelize, User, Task };
