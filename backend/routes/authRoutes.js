const express = require('express');
const { loginUser, getAllUsers, getUserByUsername, registerUser, updateUser, deleteUser } = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Get all users route
router.get('/users', getAllUsers);

// Get a specific user by username
router.get('/users/:username', getUserByUsername);

// Register route
router.post('/register', registerUser);

// Update user by ID
router.put('/users/:id', updateUser);

// Delete user by ID
router.delete('/users/:id', deleteUser);

// Registration endpoint
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;