// backend/utils/vision.js
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const path = require('path');
const fs = require('fs').promises;

const extractTextFromImage = async (fileUrl1, fileUrl2) => {
  try {
    // Process both files in parallel
    const [text1, text2] = await Promise.all([
      extractSingleFile(fileUrl1),
      extractSingleFile(fileUrl2)
    ]);

    return {
      assignmentText: text1,
      submissionText: text2
    };

  } catch (err) {
    console.error('Error in extractTextFromFiles:', err);
    throw err;
  }
};

const extractSingleFile = async (fileUrl) => {
  try {
    // Normalize the file path
    const normalizedPath = fileUrl
      .replace(/^http:\/\/localhost:5000\/uploads\//, '')
      .replace(/^\/?uploads\//, '');
    const fullPath = path.join(__dirname, '../uploads', normalizedPath);

    // Verify file exists
    await fs.access(fullPath);
    console.log(`Processing file at: ${fullPath}`);

    // Extract text using Google Vision
    const [result] = await client.textDetection(fullPath);
    
    if (!result.fullTextAnnotation) {
      throw new Error('No text found in file');
    }

    return result.fullTextAnnotation.text;

  } catch (err) {
    console.error(`Error processing ${fileUrl}:`, err);
    throw err;
  }
};

module.exports = { 
  extractTextFromImage//Renamed to be more accurate
};
