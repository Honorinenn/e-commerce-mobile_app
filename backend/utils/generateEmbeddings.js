require('dotenv').config();
const Product = require('../models/Product');
const { addVector } = require('./vectorStore');
const { generateMockEmbedding } = require('./mockEmbeddingGenerator');

const generateEmbeddings = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      if (product.embedding && product.embedding.length > 0) {
        console.log(`Embedding already exists for product: ${product.name}`);
        continue;
      }

      // Generate a mock embedding
      const embedding = generateMockEmbedding(product.description);
      product.embedding = embedding;
      await product.save();

      // Add the embedding to the local vector store
      addVector(product._id.toString(), embedding, {
        name: product.name,
        description: product.description,
      });

      console.log(`Generated embedding for product: ${product.name}`);
    }
  } catch (error) {
    console.error('Error generating embeddings:', error);
  }
};

generateEmbeddings();