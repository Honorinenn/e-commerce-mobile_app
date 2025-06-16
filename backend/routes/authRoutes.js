const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserByUsername } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import middleware

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users route
router.get('/users', protect, admin, getAllUsers); // Protected and admin-only

// Get a specific user by username
router.get('/users/:username', protect, getUserByUsername); // Protected

module.exports = router;