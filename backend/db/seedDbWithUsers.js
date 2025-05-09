require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model
const users = require('../data/usersData'); // Import the user data

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Loop through the users array and insert them into the database
    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`⚠️ User with email "${user.email}" already exists. Skipping...`);
      } else {
        await User.create(user);
        console.log(`✅ User with email "${user.email}" inserted.`);
      }
    }
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  }
};

const unseedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Delete all users from the database
    await User.deleteMany();
    console.log('✅ All users have been removed from the database');
  } catch (error) {
    console.error('❌ Error unseeding users:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  }
};

// Check command-line arguments to determine the operation
const args = process.argv.slice(2);
if (args[0] === 'unseed') {
  unseedUsers();
} else {
  seedUsers();
}