const axios = require('axios');

exports.handleChat = async (req, res) => {
  const userMessage = req.body.content || "Please provide a message.";

  console.log("userMessage: ", userMessage);  // Log the user message to the console
  
  // Set headers for SSE (Server-Sent Events)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Flush headers to establish SSE connection

  try {
    // Send the request to Gemma 2:2b model
    const axiosResponse = await axios({
      method: 'post',
      url: process.env.GEMMA_API_URL_LOCAL || 'http://localhost:11434/api/generate', 
      data: {
        model: 'gemma2:2b',
        prompt: userMessage,
      },
      responseType: 'stream',  // Enable streaming response from the model
    });

    console.log("AI response streaming has started...");

    // Stream the response from Gemma model to the client
    axiosResponse.data.on('data', (chunk) => {
      const chunkStr = chunk.toString();
      res.write(`data: ${chunkStr}\n\n`);  // Send each chunk as an SSE event
    });

    axiosResponse.data.on('end', () => {
      res.write('data: [DONE]\n\n');  // Indicate the end of the response
      res.end();
    });

    axiosResponse.data.on('error', (error) => {
      console.error('Streaming error:', error);
      res.write('data: [ERROR]\n\n');  // Indicate an error in the response
      res.end();
    });

    console.log("AI response streaming has ended...");
    
  } catch (error) {
    console.error('Error during chat response streaming:', error);
    res.status(500).json({ error: 'Failed to process the request with Gemma 2:2b.' });
  }
};