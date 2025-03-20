// backend/utils/vision.js
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const path = require('path');

const extractTextFromImage = async (fileUrl) => {
  try {
    console.log(fileUrl);
    const filename = path.join(__dirname, '../uploads/'+fileUrl);
    console.log(filename);
    const [result] = await client.textDetection(filename);
    const text = result.fullTextAnnotation.text;
    console.log(text);
    return text;
  } catch (err) {
    console.error('Error extracting text:', err);
    throw err;
  }
};

module.exports = { extractTextFromImage };