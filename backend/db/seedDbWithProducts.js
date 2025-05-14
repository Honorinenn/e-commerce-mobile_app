require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjusted the path to the Product model
const products = require('../data/productsData'); // Adjusted the path to the products data

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Loop through the products array and insert them into the database
    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (existingProduct) {
        console.log(`⚠️ Product with name "${product.name}" already exists. Skipping...`);
      } else {
        await Product.create(product);
        console.log(`✅ Product with name "${product.name}" inserted.`);
      }
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  }
};

const unseedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Delete all products from the database
    await Product.deleteMany();
    console.log('✅ All products have been removed from the database');
  } catch (error) {
    console.error('❌ Error unseeding database:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  }
};

// Check command-line arguments to determine the operation
const args = process.argv.slice(2);
if (args[0] === 'unseed') {
  unseedDatabase();
} else {
  seedDatabase();
}