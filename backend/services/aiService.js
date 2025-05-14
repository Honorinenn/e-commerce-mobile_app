const axios = require('axios');

const getAIResponse = async (input) => {
  try {
    // Call the Ollama & Gemma2 API without using an API key
    const response = await axios.post(process.env.GEMMA_API_URL, {
      prompt: input
    });
    return response.data.generatedText; // Use the AI response
  } catch (error) {
    console.error('Error calling Ollama & Gemma2 API:', error);
    throw new Error('Failed to get AI response');
  }
};

module.exports = {
  getAIResponse,
};