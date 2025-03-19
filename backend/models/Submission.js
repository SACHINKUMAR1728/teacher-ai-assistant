// backend/models/Submission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  assignmentId: { type: DataTypes.INTEGER, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  submissionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Submission;