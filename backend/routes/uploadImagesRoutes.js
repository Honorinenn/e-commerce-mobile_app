const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = 'post-images';

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

    const blobName = `${Date.now()}-${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(req.file.buffer);

    const imageUrl = blockBlobClient.url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;