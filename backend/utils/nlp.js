// backend/utils/nlp.js
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

const evaluateText = async (text) => {
  try {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Analyze syntax (grammar, sentences, etc.)
    const [syntax] = await client.analyzeSyntax({ document });
    const sentences = syntax.sentences;
    const tokens = syntax.tokens;

    // Analyze sentiment (optional)
    const [sentiment] = await client.analyzeSentiment({ document });
    const sentimentScore = sentiment.documentSentiment.score;

    return {
      sentences,
      tokens,
      sentimentScore,
    };
  } catch (err) {
    console.error('Error evaluating text:', err);
    throw err;
  }
};

module.exports = { evaluateText };