// Load environment variables from .env file
require('dotenv').config(); 

// Import required modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Bring MongoDB connection function from db.js
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const uploadImagesRoutes = require('./routes/uploadImagesRoutes');
const { BlobServiceClient } = require('@azure/storage-blob');

const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/database');
const otpRoutes = require('./routes/otpRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const recommendationRoutes = require('./routes/recommendationRoutes'); // Import recommendation routes

const app = express();
app.use(bodyParser.json());

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize the Express application
const port = process.env.PORT || 3001;

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// 1) Connect to MongoDB
connectToDatabase();

// 2) Base Route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// 3) Use Routes
app.use('/api/otp', otpRoutes);
app.use('/api/products', productRoutes); // Add product routes
app.use('/api/auth', authRoutes); // Use Authentication Routes
app.use('/api/recommendations', recommendationRoutes); // Use Recommendation Routes

// 4) Start Server
const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// Execute MongoDB connection
connectDB();

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the postRoutes for handling requests to /api/posts
app.use('/api/posts', postRoutes);

// Use the chatRoutes for handling requests to /api/chat
app.use('/api/chat', chatRoutes);

// Use the upload images routes
app.use('/api', uploadImagesRoutes);

// Check Azure Blob Storage connection
const checkAzureBlobStorageConnection = async () => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container: ${container.name}`);
    }
    console.log('Successfully connected to Azure Blob Storage');
  } catch (error) {
    console.error('Error connecting to Azure Blob Storage:', error);
  }
};

// Start the server and listen on the specified port
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await checkAzureBlobStorageConnection();
});