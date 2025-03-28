// backend/routes/evaluationRoutes.js
const express = require('express');
const { evaluateSubmission } = require('../controllers/evaluationController');

const router = express.Router();

// Route for evaluating submissions
router.post('/evaluate/:id', evaluateSubmission);

module.exports = router;