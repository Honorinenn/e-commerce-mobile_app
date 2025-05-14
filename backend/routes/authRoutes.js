const express = require('express');
const { loginUser, getAllUsers, getUserByUsername } = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Get all users route
router.get('/users', getAllUsers);

// Get a specific user by username
router.get('/users/:username', getUserByUsername);

module.exports = router;