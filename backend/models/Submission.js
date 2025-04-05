const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
  assignmentId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  fileUrl: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  submissionDate: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  feedback: { 
    type: DataTypes.TEXT // or DataTypes.JSON for structured feedback
  }
});

// Association
Submission.associate = (models) => {
  Submission.belongsTo(models.Assignment, { 
    foreignKey: 'assignmentId' 
  });
};
module.exports = Submission;
