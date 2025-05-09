require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./utils/database');
const otpRoutes = require('./routes/otpRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes

const app = express();
app.use(bodyParser.json());

// 1) Connect to MongoDB
connectToDatabase();

// 2) Base Route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// 3) Use Routes
app.use('/otp', otpRoutes);
app.use('/products', productRoutes); // Add product routes

// 4) Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
