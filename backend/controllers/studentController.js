// backend/controllers/studentController.js
const Submission = require('../models/Submission');
const { evaluateSubmission } = require('./evaluationController');

// backend/controllers/studentController.js
const Feedback = require('../models/Feedback');

exports.getFeedback = async (req, res) => {
  const { studentId } = req.params;
  try {
    const feedback = await Feedback.findAll({
      where: { studentId }, // Assuming Feedback has a studentId field
    });
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.submitAssignment = async (req, res) => {
  const { studentId, assignmentId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  try {
    const fileUrl = `${file.filename}`; // Local file URL
    const submission = await Submission.create({ studentId, assignmentId, fileUrl });
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};