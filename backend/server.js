// Check if .env file exists
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env file is missing. Please create it before starting the server.');
  process.exit(1);
}
require('dotenv').config({ path: envPath }); 

// Import required modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Bring MongoDB connection function from db.js
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const uploadImagesRoutes = require('./routes/uploadImagesRoutes');
const { BlobServiceClient } = require('@azure/storage-blob');

const { connectToDatabase } = require('./utils/database');
const otpRoutes = require('./routes/otpRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const recommendationRoutes = require('./routes/recommendationRoutes'); // Import recommendation routes
const apiDocsRoutes = require('./routes/apiDocsRoutes'); // Import API documentation routes

const app = express();

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
app.use('/api/routes', apiDocsRoutes); // Register API documentation routes

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
app.use('/api/uploadimages', uploadImagesRoutes);

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

// Helper to print all registered routes with descriptions
const ROUTE_DESCRIPTIONS = {
  '/api/chat': 'AI chat (streaming supported)',
  '/api/products': 'List, create, update, or delete products',
  '/api/products/:id': 'Get, update, or delete a specific product',
  '/api/images/:filename': 'Serve product images',
  '/api/otp': 'OTP-based authentication',
  '/api/auth': 'User authentication (login, register, etc.)',
  '/api/recommendations': 'Product recommendations',
  '/api/posts': 'Blog posts (CRUD)',
  '/api/routes': 'API documentation (list all routes)',
  '/api/uploadimages': 'Upload images',
  '/': 'API health/status',
};

function printRoutes(app) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({ method: Object.keys(middleware.route.methods)[0].toUpperCase(), path: middleware.route.path });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          routes.push({ method: Object.keys(route.methods)[0].toUpperCase(), path: route.path });
        }
      });
    }
  });
  return routes;
}

// Start the server and listen on the specified port
app.listen(port, async () => {
  console.log(`\n🚀 Server is running on port ${port}`);
  console.log('🤖 Chat endpoint is ready at /api/chat (streaming supported)');
  await checkAzureBlobStorageConnection();
  // Print all available routes with descriptions (aligned formatting)
  const routes = printRoutes(app);
  const maxMethod = Math.max(...routes.map(r => r.method.length));
  const maxPath = Math.max(...routes.map(r => r.path.length));
  console.log('\nAvailable backend routes:');
  routes.forEach(r => {
    const desc = ROUTE_DESCRIPTIONS[r.path] || '';
    const methodPad = r.method.padEnd(maxMethod, ' ');
    const pathPad = r.path.padEnd(maxPath, ' ');
    console.log(`  [${methodPad}] ${pathPad}  ${desc}`);
  });
});