const Product = require('../models/Product');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + allowedTypes));
  }
}).single('image'); // Expect a single file with the field name 'image'

// CREATE a new product
const createProduct = async (req, res) => {
  const { name, description, price, stock, stockQuantity, images, category, brand, dimensions, weight, barcodes, isFeatured, tags } = req.body;
  
  // Handle both 'stock' and 'stockQuantity' field names for compatibility
  const stockValue = stock !== undefined ? stock : stockQuantity;
  
  // Validate required fields
  if (!name || !price || !category) {
    return res.status(400).json({ 
      error: 'Name, price, and category are required',
      missingFields: {
        name: !name,
        price: !price,
        category: !category
      }
    });
  }

  try {
    const product = await Product.create({ 
      name, 
      description, 
      price, 
      stock: stockValue,
      images,
      category,
      brand,
      dimensions,
      weight,
      barcodes,
      isFeatured,
      tags
    });
    res.status(201).json(product);
  } catch (err) {
    console.error('Create Product error:', err);
    
    // Provide more detailed error information
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res.status(400).json({ 
        error: 'Validation failed', 
        validationErrors 
      });
    }
    
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// READ all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Get Products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// READ a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Get Product error:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// UPDATE a product by ID
const updateProductById = async (req, res) => {
  const { id } = req.params;
  // Accept all updatable fields, including images/imageUrl/imageUrls
  const {
    name,
    description,
    price,
    stock,
    images,
    imageUrl,
    imageUrls,
    category,
    brand,
    dimensions,
    weight,
    barcodes,
    isFeatured,
    tags
  } = req.body;

  // Merge all possible image fields into a single images array
  let imagesArray = images || imageUrls || [];
  if (imageUrl) {
    if (!imagesArray.includes(imageUrl)) imagesArray.unshift(imageUrl);
  }
  // Remove empty strings and duplicates
  imagesArray = imagesArray.filter((url, idx, arr) => url && arr.indexOf(url) === idx);

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
        images: imagesArray.length > 0 ? imagesArray : undefined,
        category,
        brand,
        dimensions,
        weight,
        barcodes,
        isFeatured,
        tags,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Update Product error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// UPDATE product images by ID
const updateProductImages = async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { images } }, // Update the images array
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Update Product Images error:', err);
    res.status(500).json({ error: 'Failed to update product images' });
  }
};

// DELETE a product by ID
const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete Product error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// UPLOAD image to Azure Blob Storage
const uploadImageToAzure = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Ensure the container exists
  try {
    await containerClient.createIfNotExists({ access: 'blob' }); // 'blob' for public read access to blobs
  } catch (error) {
    console.error('Error ensuring container exists:', error);
    return res.status(500).json({ error: 'Failed to ensure Azure container exists.', details: error.message });
  }


  const blobName = `${uuidv4()}-${req.file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype }
    });
    const imageUrl = blockBlobClient.url;
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.error('Azure Blob Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image to Azure Blob Storage.', details: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductImages,
  deleteProductById,
  uploadImageToAzure, // Export the new function
  upload, // Export multer middleware for use in routes
};