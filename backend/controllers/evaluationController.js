// backend/controllers/evaluationController.js
const { extractTextFromImage } = require('../utils/vision');
const { evaluateText } = require('../utils/nlp');
const { generateFeedback } = require('../utils/gemini');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');


exports.evaluateSubmission = async (req, res) => {
  try {
    console.log("Evaluation request for submission ID:", req.params.id);

    // Find submission
    const submission = await Submission.findByPk(req.params.id);
    console.log("Assignemnt for submission found:", submission.assignmentId);
    const assignment = await Assignment.findByPk(submission.assignmentId);
    if (!submission) {
      console.error('Submission not found');
      return res.status(404).json({ error: 'Submission not found' });
    }
    if (!assignment) {
      console.error('Assignment not found');
      return res.status(404).json({ error: 'Assignment not found' });
    }
    console.log(assignment.fileUrl, submission.fileUrl);



    // Extract text from both files
    const { assignmentText, submissionText } = await extractTextFromImage(
      assignment.fileUrl,
      submission.fileUrl
    );

    // Generate contextual feedback
    const feedbackText = await generateFeedback({
      assignmentText,
      submissionText
    });

    // Update submission with feedback
    await submission.update({ feedback: feedbackText });
    console.log('Evaluation completed successfully');

    res.json({ 
      success: true, 
      feedback: feedbackText
    });
    

    
  } catch (err) {
    console.error('Evaluation error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Evaluation failed',
    });
  }
};