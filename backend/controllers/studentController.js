// backend/controllers/studentController.js
const Submission = require('../models/Submission');

exports.submitAssignment = async (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log("File URL:", fileUrl); // Debugging line
    const submission = await Submission.create({
      assignmentId: req.body.assignmentId,  // Only keep assignmentId
      fileUrl                                  // Remove studentId and status
    });
    console.log("Submission Created:", submission); // Debugging line
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Submission failed' });
  }
};