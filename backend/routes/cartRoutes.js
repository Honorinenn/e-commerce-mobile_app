const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { items: [] });
});

// Add/update item in cart
router.post('/add', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });
  const itemIndex = cart.items.findIndex(i => i.product.equals(productId));
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  res.json(cart);
});

// Remove item from cart
router.post('/remove', authenticate, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (cart) {
    cart.items = cart.items.filter(i => !i.product.equals(productId));
    await cart.save();
  }
  res.json(cart);
});

module.exports = router;
