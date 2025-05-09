const generateMockEmbedding = (text) => {
  // Generate a mock embedding (e.g., an array of random numbers)
  return Array.from({ length: 128 }, () => Math.random());
};

module.exports = { generateMockEmbedding };