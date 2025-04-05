// backend/controllers/feedbackController.js
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// Get feedback by submission ID
exports.getFeedbackBySubmission = async (req, res) => {
  console.log("Fetching feedback for assignment ID:", req.params.AssignmentId);
  try {
    const submission = await Submission.findOne({
      where: { assignmentId: req.params.AssignmentId }
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