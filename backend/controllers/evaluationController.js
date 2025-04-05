// backend/controllers/evaluationController.js
const { extractTextFromImage } = require('../utils/vision');
const { evaluateText } = require('../utils/nlp');
const { generateFeedback } = require('../utils/gemini');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');


exports.evaluateSubmission = async (assignmentId,submissionfileUrl) => {
  try {
    // console.log("Evaluation request for submission ID:", req.params.id);

    // Find submission
    // const submission = await Submission.findOne({ where: { assignmentId, fileUrl } }); // Update to find submission by assignmentId and fileUrl
    // if (!submission) {
    //   console.error('Submission not found');
    //   return res.status(404).json({ error: 'Submission not found' });
    // }
    // console.log("Assignemnt for submission found:", submission.assignmentId);
    console.log("ENTERED EVALUATION FUNCTION");
    const assignment = await Assignment.findByPk(assignmentId);
    console.log("Assignment found:", assignment);
    if (!assignment) {
      console.error('Assignment not found');
      return 'Assignment not found';
      //return res.status(404).json({ error: 'Assignment not found' });
    }
    //console.log(assignment.fileUrl, submissionfileUrl);



    // Extract text from both files
    const { assignmentText, submissionText } = await extractTextFromImage(
      assignment.fileUrl,
      submissionfileUrl
    );

    // Generate contextual feedback
    const feedbackText = await generateFeedback({
      assignmentText,
      submissionText
    });

    // Update submission with feedback
    // await submission.update({ feedback: feedbackText });
    console.log('Evaluation completed successfully');

    
    return feedbackText
    
  } catch (err) {
    console.error('Evaluation error:', err);
    return 'Evaluation error';
  }
};