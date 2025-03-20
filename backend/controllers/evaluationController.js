// backend/controllers/evaluationController.js
const { extractTextFromImage } = require('../utils/vision');
const { evaluateText } = require('../utils/nlp');
const { generateFeedback } = require('../utils/gemini');
const Submission = require('../models/Submission');
const Feedback = require('../models/Feedback');

exports.evaluateSubmission = async (req, res) => {
  const { submissionId } = req.params;

  try {
    // Fetch submission from the database
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    // Extract text from the submission (using Vision AI for images)
    const extractedText = await extractTextFromImage(submission.fileUrl);
    // console.log(extractedText);

    // Evaluate the extracted text (using NLP AI)
    const evaluationResults = await evaluateText(extractedText);
    console.log(evaluationResults);

    // Generate feedback (using Gemini AI)
    const feedbackText = await generateFeedback(evaluationResults);

    // Save feedback to the database
    const feedback = await Feedback.create({
      submissionId,
      feedbackText,
    });

    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};