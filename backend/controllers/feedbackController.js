// backend/controllers/feedbackController.js
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// Get feedback by submission ID
exports.getFeedbackBySubmission = async (req, res) => {
  
  try {
    const submission = await Submission.findByPk(req.params.submissionId, {
      
    });

    if (!submission) {
      return res.status(404).json({ message: 'No submission found' });
    }
    
    res.json({
      id: submission.id,
      fileUrl: submission.fileUrl,
      feedback: submission.feedback,
      assignment: submission.assignmentId
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
};

// Remove getFeedbackByStudent (student tracking removed)