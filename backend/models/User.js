const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // User role
  isActive: { type: Boolean, default: true }, // Account status
  profileImage: { type: String }, // URL to profile image
  phoneNumber: { type: String }, // Optional phone number
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  }, // User address
  resetPasswordToken: { type: String }, // Token for password reset
  resetPasswordExpires: { type: Date }, // Expiry for password reset token
  createdAt: { type: Date, default: Date.now }, // Account creation date
  updatedAt: { type: Date, default: Date.now }, // Last update date
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate a password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const token = require('crypto').randomBytes(32).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
  return token;
};

module.exports = mongoose.model('User', userSchema);