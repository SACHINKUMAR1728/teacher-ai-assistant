// backend/models/Assignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assignment = sequelize.define('Assignment', {
  title: { type: DataTypes.STRING, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: false },
  instructions: { type: DataTypes.TEXT },
});

// Define associations
Assignment.associate = (models) => {
  Assignment.hasMany(models.Submission, { foreignKey: 'assignmentId' });
};


module.exports = Assignment;