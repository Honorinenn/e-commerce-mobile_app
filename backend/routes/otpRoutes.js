const express = require('express');
const Otp = require('../models/Otp');
const { generateOtp } = require('../utils/otp');
const { sendOtpEmail } = require('../utils/email');

const router = express.Router();

// POST /otp/request
router.post('/request', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const code = generateOtp();
  try {
    // Save OTP (expires in 5 min via TTL)
    await Otp.create({ email, code });

    // Send OTP via email
    await sendOtpEmail(email, code);

    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// POST /otp/verify
router.post('/verify', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email and code are required' });

  try {
    // Look for matching, unexpired OTP
    const record = await Otp.findOne({ email, code });
    if (!record) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Optionally delete to prevent reuse
    await Otp.deleteMany({ email, code });

    res.json({ success: true, message: 'Login successful!' });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;