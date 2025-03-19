const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'PSTGRS', 'password', {
  host: 'localhost',
  port: 8092, 
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
