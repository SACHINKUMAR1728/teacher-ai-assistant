// backend/controllers/evaluationController.js
const { extractTextFromImage } = require('../utils/vision');
const { evaluateText } = require('../utils/nlp');
const { generateFeedback } = require('../utils/gemini');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');


exports.evaluateSubmission = async (assignmentId,submissionfileUrl) => {
  try {
    
    const assignment = await Assignment.findByPk(assignmentId);
    console.log("Assignment found:", assignment);
    if (!assignment) {
      console.error('Assignment not found');
      return 'Assignment not found';
      //return res.status(404).json({ error: 'Assignment not found' });
    }
    
    const { assignmentText, submissionText } = await extractTextFromImage(
      assignment.fileUrl,
      submissionfileUrl
    );

    // Generate contextual feedback
    const feedbackText = await generateFeedback({
      assignmentText,
      submissionText
    });


    
    return feedbackText
    
  } catch (err) {
    console.error('Evaluation error:', err);
    return 'Evaluation error';
  }
};