const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductImages,
  deleteProductById,
} = require('../controllers/productController');
const Product = require('../models/Product');

const router = express.Router();

// CREATE a new product
router.post('/', createProduct);

// READ all products, with optional category filter
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all unique product categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// READ a single product by ID
router.get('/:id', getProductById);

// UPDATE a product by ID
router.put('/:id', updateProductById);

// UPDATE product images by ID
router.put('/:id/images', updateProductImages);

// DELETE a product by ID
router.delete('/:id', deleteProductById);

module.exports = router;