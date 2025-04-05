// backend/controllers/studentController.js
const Submission = require('../models/Submission');
const {evaluateSubmission} = require('../controllers/evaluationController'); // Import the evaluation controller

exports.submitAssignment = async (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log("yha tk correct h File URL:", fileUrl); // Debugging line
    const feedbacktext = await evaluateSubmission(req.body.assignmentId,fileUrl)
    console.log("Feedback text:", feedbacktext); // Debugging line
    const submission = await Submission.create({
      assignmentId: req.body.assignmentId,  // Only keep assignmentId
      fileUrl,
      feedback:feedbacktext                                  // Remove studentId and status
    });
    console.log("Submission Created:", submission); // Debugging line
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Submission failed' });
  }
};