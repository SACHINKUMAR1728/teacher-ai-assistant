// backend/controllers/studentController.js
const Submission = require('../models/Submission');

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