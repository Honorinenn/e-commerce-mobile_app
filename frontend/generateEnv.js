const fs = require('fs');
const path = require('path');

const domain = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-3001.app.github.dev`
  : 'http://localhost:3001';

const postApiBackend = `${domain}/api/posts`;

const chatApiBackend = `${domain}/api/chat`;

const imageUploadUrl = `${domain}/api/upload`;

const envContent = `REACT_APP_API_URL=${postApiBackend}\nREACT_APP_GEMMA_API_URL=${chatApiBackend}\nREACT_APP_IMAGE_UPLOAD_URL=${imageUploadUrl}\n`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent, 'utf8');
console.log('.env file has been generated with the following content:');
console.log(envContent);