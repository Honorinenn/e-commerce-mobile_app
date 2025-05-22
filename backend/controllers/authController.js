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

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  try {
    // Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already in use' });
    }
    // Create and save new user
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    // Prevent updating password directly here for security
    if (updateData.password) delete updateData.password;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { loginUser, getAllUsers, getUserByUsername, registerUser, updateUser, deleteUser };