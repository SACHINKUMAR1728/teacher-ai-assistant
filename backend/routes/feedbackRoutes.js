// backend/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Get feedback by submission ID (now directly from Submission table)
router.get('/:submissionId', feedbackController.getFeedbackBySubmission);

module.exports = router;