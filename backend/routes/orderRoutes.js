const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authenticate } = require('../middleware/auth');

// Place order
router.post('/place', authenticate, async (req, res) => {
  const { shippingAddress } = req.body;
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  const items = cart.items.map(i => ({
    product: i.product._id,
    quantity: i.quantity,
    price: i.product.price
  }));
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = new Order({ user: req.user.id, items, shippingAddress, total });
  await order.save();
  cart.items = [];
  await cart.save();
  res.json(order);
});

// Get user's orders
router.get('/', authenticate, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
});

module.exports = router;
