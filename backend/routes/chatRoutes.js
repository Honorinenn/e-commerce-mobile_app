const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.handleChat);

// GET /api/chat?message=roses%20are%20red - Streams a poetic response
router.get('/', chatController.streamPoem);

module.exports = router;