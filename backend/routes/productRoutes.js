const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductImages,
  deleteProductById,
  uploadImageToAzure, // Import the new Azure upload function
  upload, // Import multer middleware
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware'); // Ensure admin is imported

const router = express.Router();

// CREATE a new product - Accessible to all authenticated users
router.post('/', protect, createProduct);

// READ all products
router.get('/', getAllProducts);

// READ a single product by ID
router.get('/:id', getProductById);

// UPDATE a product by ID - Accessible to all authenticated users
router.put('/:id', protect, updateProductById);

// UPDATE product images by ID - Accessible to all authenticated users (if needed, or keep admin)
// For now, let's assume if a user can update a product, they can update its images.
router.put('/:id/images', protect, updateProductImages);

// DELETE a product by ID - Accessible to admin users only
router.delete('/:id', protect, admin, deleteProductById);

// UPLOAD an image for a product - Accessible to all authenticated users
router.post('/upload-image', protect, upload, uploadImageToAzure);

module.exports = router;