const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body; // Use the email and password from the request body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login successful', 
      token, 
      theToken: token,
      user: {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
      createdAt: user.createdAt,  
    }, });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Respond with the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await User.findOne({ username }); // Find the user by username
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Respond with the user details
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = { loginUser, getAllUsers, getUserByUsername };