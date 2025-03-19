// backend/models/Feedback.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
  submissionId: { type: DataTypes.INTEGER, allowNull: false },
  feedbackText: { type: DataTypes.TEXT, allowNull: false },
  grade: { type: DataTypes.STRING },
});

module.exports = Feedback;