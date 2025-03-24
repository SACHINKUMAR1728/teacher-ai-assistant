// backend/routes/studentRoutes.js
const express = require('express');
const { submitAssignment, getFeedback } = require('../controllers/studentController');
const upload = require('../utils/fileUpload');

const router = express.Router();

// Route for submitting assignments
router.post('/submit', upload.single('file'), submitAssignment);
router.get('/feedback/:studentId', getFeedback); 

module.exports = router;