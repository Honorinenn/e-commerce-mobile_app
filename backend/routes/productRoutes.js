const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductImages,
  deleteProductById,
} = require('../controllers/productController');

const router = express.Router();

// CREATE a new product
router.post('/', createProduct);

// READ all products
router.get('/', getAllProducts);

// READ a single product by ID
router.get('/:id', getProductById);

// UPDATE a product by ID
router.put('/:id', updateProductById);

// UPDATE product images by ID
router.put('/:id/images', updateProductImages);

// DELETE a product by ID
router.delete('/:id', deleteProductById);

module.exports = router;