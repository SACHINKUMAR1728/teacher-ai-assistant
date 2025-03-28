// backend/utils/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate feedback
const generateFeedback = async (evaluationResults) => {
  console.log(evaluationResults);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are a digital image processing professor evaluating a student's assignment. Compare the assignment requirements with the student's submission and provide detailed feedback:

ASSIGNMENT REQUIREMENTS:
${evaluationResults.assignmentText}

STUDENT SUBMISSION:
${evaluationResults.submissionText}

Provide structured feedback focusing on:
1. CONTENT EVALUATION:
   - Relevance to digital image processing topics
   - Coverage of key concepts (image sampling, transformations, filtering, etc.)
   - Technical accuracy

2. STRUCTURE ANALYSIS:
   - Logical flow of concepts
   - Proper use of technical terminology
   - Clarity of explanations

3. IMPROVEMENTS NEEDED:
   - Specific missing elements from the requirements
   - Areas needing more depth or correction
   - Suggested resources for better understanding

4. FINAL ASSESSMENT:
   - Overall score (0-100)
   - Key strengths
   - Critical weaknesses

Note: The submission appears to discuss political theory rather than digital image processing. Address this fundamental mismatch in your feedback.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();
    return feedback;
  } catch (err) {
    console.error('Error generating feedback:', err);
    throw err;
  }
};

module.exports = { generateFeedback };