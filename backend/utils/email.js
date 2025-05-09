const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(email, code) {
  await transporter.sendMail({
    from: `"Security Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Dear User,\n\nYour OTP code for login is: ${code}\n\nThis code is valid for 5 minutes.\n\nBest regards,\nYour Security Team`,
  });
}

module.exports = { sendOtpEmail };