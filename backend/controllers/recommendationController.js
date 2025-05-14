const { queryVectors } = require('../utils/vectorStore');
const { generateMockEmbedding } = require('../utils/mockEmbeddingGenerator');

const recommendProducts = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Generate a mock embedding for the query
    const queryEmbedding = generateMockEmbedding(query);

    // Query the local vector store
    const recommendations = queryVectors(queryEmbedding, 5).map((result) => ({
      id: result.id, // Include the product ID
      name: result.metadata.name,
      description: result.metadata.description,
    }));

    res.json({ recommendations });
  } catch (error) {
    console.error('Error recommending products:', error);
    res.status(500).json({ error: 'Failed to recommend products' });
  }
};

module.exports = { recommendProducts };