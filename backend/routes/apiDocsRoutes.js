const express = require('express');
const router = express.Router();

// Descriptive API documentation for all routes
const apiRoutes = [
  {
    method: 'GET',
    path: '/',
    description: 'Base API endpoint. Returns API status.',
    sampleInput: null,
    sampleOutput: { message: 'API is working!' }
  },
  {
    method: 'POST',
    path: '/api/auth/register',
    description: 'Register a new user.',
    sampleInput: { username: 'johndoe', email: 'john@example.com', password: 'password123' },
    sampleOutput: { success: true, userId: 'abc123', token: 'jwt.token.here' }
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    description: 'Authenticate user and return a token.',
    sampleInput: { email: 'john@example.com', password: 'password123' },
    sampleOutput: { success: true, token: 'jwt.token.here', user: { id: 'abc123', email: 'john@example.com' } }
  },
  {
    method: 'POST',
    path: '/api/otp/send',
    description: 'Send OTP to user for verification.',
    sampleInput: { email: 'john@example.com' },
    sampleOutput: { success: true, message: 'OTP sent to email.' }
  },
  {
    method: 'POST',
    path: '/api/otp/verify',
    description: 'Verify OTP for user.',
    sampleInput: { email: 'john@example.com', otp: '123456' },
    sampleOutput: { success: true, message: 'OTP verified.' }
  },
  {
    method: 'GET',
    path: '/api/products',
    description: 'Get all products.',
    sampleInput: null,
    sampleOutput: [{ id: 'prod1', name: 'iPhone 16', price: 999 }, { id: 'prod2', name: 'Tablet', price: 499 }]
  },
  {
    method: 'GET',
    path: '/api/products/:id',
    description: 'Get product details by ID.',
    sampleInput: null,
    sampleOutput: { id: 'prod1', name: 'iPhone 16', price: 999, description: 'Latest iPhone.' }
  },
  {
    method: 'POST',
    path: '/api/products',
    description: 'Create a new product.',
    sampleInput: { name: 'iPhone 16', price: 999, description: 'Latest iPhone.' },
    sampleOutput: { success: true, product: { id: 'prod1', name: 'iPhone 16', price: 999 } }
  },
  {
    method: 'PUT',
    path: '/api/products/:id',
    description: 'Update product by ID.',
    sampleInput: { name: 'iPhone 16 Pro', price: 1099 },
    sampleOutput: { success: true, product: { id: 'prod1', name: 'iPhone 16 Pro', price: 1099 } }
  },
  {
    method: 'DELETE',
    path: '/api/products/:id',
    description: 'Delete product by ID.',
    sampleInput: null,
    sampleOutput: { success: true, message: 'Product deleted.' }
  },
  {
    method: 'GET',
    path: '/api/posts',
    description: 'Get all posts.',
    sampleInput: null,
    sampleOutput: [{ id: 'post1', title: 'Welcome', content: 'Hello world!' }]
  },
  {
    method: 'POST',
    path: '/api/posts',
    description: 'Create a new post.',
    sampleInput: { title: 'Welcome', content: 'Hello world!' },
    sampleOutput: { success: true, post: { id: 'post1', title: 'Welcome', content: 'Hello world!' } }
  },
  {
    method: 'GET',
    path: '/api/chat',
    description: 'Get chat messages.',
    sampleInput: null,
    sampleOutput: [{ from: 'user1', message: 'Hi!' }, { from: 'user2', message: 'Hello!' }]
  },
  {
    method: 'POST',
    path: '/api/chat',
    description: 'Send a chat message.',
    sampleInput: { from: 'user1', message: 'Hi!' },
    sampleOutput: { success: true, message: { from: 'user1', message: 'Hi!' } }
  },
  {
    method: 'POST',
    path: '/api/upload',
    description: 'Upload an image.',
    sampleInput: { file: '<binary image data>' },
    sampleOutput: { success: true, url: 'https://storage.example.com/image.png' }
  },
  {
    method: 'GET',
    path: '/api/recommendations',
    description: 'Get product recommendations.',
    sampleInput: null,
    sampleOutput: [{ id: 'prod2', name: 'Tablet', price: 499 }]
  },
  {
    method: 'GET',
    path: '/api/chat',
    description: 'Stream a poetic response if the message is "roses are red". Uses SSE (Server-Sent Events) to stream the poem line by line. For any other message, streams the response from the AI model.',
    sampleInput: { message: 'roses are red' },
    sampleOutput: {
      eventStream: [
        'data: Roses are red,',
        'data: Violets are blue,',
        'data: Sugar is sweet,',
        'data: And so are you.',
        'data: [DONE]'
      ]
    }
  }
];

router.get('/', (req, res) => {
  res.json({
    message: 'API Route Documentation',
    routes: apiRoutes
  });
});

module.exports = router;
