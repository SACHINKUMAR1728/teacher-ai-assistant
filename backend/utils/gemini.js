// backend/utils/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate feedback
const generateFeedback = async (evaluationResults) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    You are a teacher evaluating a student's assignment. Provide constructive feedback based on the following evaluation results:

    - Grammar and Syntax: ${evaluationResults.tokens.length} tokens analyzed.
    - Sentiment: ${evaluationResults.sentimentScore >= 0 ? 'Positive' : 'Negative'} sentiment detected.
    - Key Sentences: ${evaluationResults.sentences.map(s => s.text.content).join(', ')}

    Feedback should include:
    1. Strengths of the assignment.
    2. Areas for improvement.
    3. Suggestions for better performance in the future.
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