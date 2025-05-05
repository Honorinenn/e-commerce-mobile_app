const vectorStore = [];

// Add a vector to the store
const addVector = (id, embedding, metadata) => {
  vectorStore.push({ id, embedding, metadata });
};

// Query the store for the top K similar vectors
const queryVectors = (queryEmbedding, topK = 5) => {
  const cosineSimilarity = (a, b) => {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  return vectorStore
    .map((vector) => ({
      ...vector,
      similarity: cosineSimilarity(queryEmbedding, vector.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
};

module.exports = { addVector, queryVectors };