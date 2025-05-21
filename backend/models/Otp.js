const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email:     { type: String, required: true },
  code:      { type: String, required: true },
  createdAt: { type: Date,   default: Date.now, expires: 300 } // auto-delete after 5 min
});

// TTL index: document expires 300 seconds after createdAt
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model('Otp', otpSchema);