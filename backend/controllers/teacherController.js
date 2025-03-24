// backend/controllers/teacherController.js
const Assignment = require('../models/Assignment');

exports.uploadAssignment = async (req, res) => {
  const { title, deadline, instructions } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  try {
    const fileUrl = `http://localhost:5000/uploads/${file.filename}`; // Local file URL
    const assignment = await Assignment.create({ title, fileUrl, deadline, instructions });
    res.status(201).json({ success: true, data: assignment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.status(200).json({ success: true, data: assignments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};