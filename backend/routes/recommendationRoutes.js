const express = require('express');
const { recommendProducts } = require('../controllers/recommendationController');

const router = express.Router();

// POST /recommendations
router.post('/', recommendProducts);

module.exports = router;