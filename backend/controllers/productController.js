const Product = require('../models/Product');

// CREATE a new product
const createProduct = async (req, res) => {
  const { name, description, price, stock, images } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const product = await Product.create({ name, description, price, stock, images });
    res.status(201).json(product);
  } catch (err) {
    console.error('Create Product error:', err);
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
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  updateProductImages,
  deleteProductById,
};