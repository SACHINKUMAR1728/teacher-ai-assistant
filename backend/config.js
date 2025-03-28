// backend/config.js
require('dotenv').config();

module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  DB_CONFIG: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};