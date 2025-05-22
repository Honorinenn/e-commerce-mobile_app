const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authenticate } = require('../middleware/auth');

// Add review
router.post('/add', authenticate, async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = new Review({ product: productId, user: req.user.id, rating, comment });
  await review.save();
  res.json(review);
});

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'username');
  res.json(reviews);
});

module.exports = router;
