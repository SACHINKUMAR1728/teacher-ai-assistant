// backend/routes/studentRoutes.js
const express = require('express');
const { submitAssignment } = require('../controllers/studentController');
const upload = require('../utils/fileUpload');

const router = express.Router();
// Submit assignment (removed studentId reference)
router.post('/submit', upload.single('file'), submitAssignment);
module.exports = router;