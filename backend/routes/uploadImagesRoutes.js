const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = 'post-images';

router.post('/upload', upload.single('image'), async (req, res) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`🚀 === BACKEND IMAGE UPLOAD START [${requestId}] ===`);
    console.log('📡 Request details:', {
      method: req.method,
      url: req.url,
      headers: {
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length'],
        'user-agent': req.headers['user-agent'],
        'origin': req.headers['origin']
      },
      body: {
        hasFile: !!req.file,
        bodyKeys: Object.keys(req.body || {}),
        bodyType: typeof req.body
      }
    });

    console.log('📋 Step 1: Validating uploaded file...');
    console.log('🔍 Raw request analysis:');
    console.log('  - req.file exists:', !!req.file);
    console.log('  - req.files exists:', !!req.files);
    console.log('  - req.body:', req.body);
    
    if (req.file) {
      console.log('📁 File object details:', {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bufferExists: !!req.file.buffer,
        bufferLength: req.file.buffer ? req.file.buffer.length : 'undefined'
      });
    } else {
      console.log('❌ No file object found in request');
      console.log('🔍 Checking for malformed data...');
      
      // Check if there's any file-like data in the body
      if (req.body && typeof req.body === 'object') {
        Object.keys(req.body).forEach(key => {
          console.log(`  - Body key "${key}":`, typeof req.body[key], req.body[key]);
        });
      }
    }

    console.log('📋 Step 1: Validating uploaded file...');
    if (!req.file) {
      console.log('❌ Step 1 Failed: No file received in request');
      return res.status(400).json({ 
        error: 'No file uploaded',
        message: 'Please select an image file to upload',
        requestId 
      });
    }

    console.log('📊 File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      fieldname: req.file.fieldname,
      bufferLength: req.file.buffer ? req.file.buffer.length : 'undefined'
    });

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      console.log('❌ Step 1 Failed: Invalid file type');
      return res.status(400).json({ 
        error: 'Invalid file type',
        message: `File type ${req.file.mimetype} not allowed. Use: ${allowedMimeTypes.join(', ')}`,
        requestId 
      });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      console.log('❌ Step 1 Failed: File too large');
      return res.status(400).json({ 
        error: 'File too large',
        message: `File size ${Math.round(req.file.size / 1024 / 1024)}MB exceeds limit of 10MB`,
        requestId 
      });
    }

    console.log('✅ Step 1: File validation passed');

    console.log('🔐 Step 2: Connecting to Azure Blob Storage...');
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.log('❌ Step 2 Failed: Azure connection string not configured');
      return res.status(500).json({ 
        error: 'Storage configuration error',
        message: 'Azure storage not properly configured',
        requestId 
      });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
    console.log('✅ Step 2: Azure connection established');

    console.log('📂 Step 3: Preparing blob upload...');
    const timestamp = Date.now();
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blobName = `${timestamp}-${safeName}`;
    
    console.log('📊 Blob details:', {
      containerName: AZURE_STORAGE_CONTAINER_NAME,
      blobName: blobName,
      contentType: req.file.mimetype
    });

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('✅ Step 3: Blob client created');

    console.log('⬆️ Step 4: Uploading to Azure...');
    const uploadStartTime = Date.now();
    
    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype
      }
    });
    
    const uploadDuration = Date.now() - uploadStartTime;
    console.log(`✅ Step 4: Upload completed in ${uploadDuration}ms`);

    console.log('🔗 Step 5: Generating public URL...');
    const imageUrl = blockBlobClient.url;
    console.log('📊 Generated URL:', imageUrl);

    // Verify URL format
    try {
      new URL(imageUrl);
      console.log('✅ Step 5: URL validation passed');
    } catch (urlError) {
      console.log('❌ Step 5 Failed: Invalid URL generated');
      return res.status(500).json({ 
        error: 'URL generation failed',
        message: 'Generated URL is invalid',
        requestId 
      });
    }

    console.log(`🎉 === UPLOAD SUCCESSFUL [${requestId}] ===`);
    console.log('📊 Final response:', { imageUrl, requestId });
    
    res.status(200).json({ 
      imageUrl,
      message: 'Image uploaded successfully',
      requestId,
      fileDetails: {
        originalName: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      }
    });

  } catch (error) {
    console.error(`💥 === UPLOAD FAILED [${requestId}] ===`);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });

    // Determine specific error type
    let errorMessage = 'Error uploading image';
    let statusCode = 500;

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to Azure storage';
      statusCode = 503;
    } else if (error.message.includes('authorization')) {
      errorMessage = 'Azure storage authorization failed';
      statusCode = 503;
    } else if (error.message.includes('container')) {
      errorMessage = 'Azure storage container error';
      statusCode = 503;
    }

    res.status(statusCode).json({ 
      error: errorMessage,
      message: error.message,
      requestId,
      errorType: error.name || 'UnknownError'
    });
  }
});

module.exports = router;