const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  description: { type: String }, // Product description
  price: { type: Number, required: true }, // Product price
  stock: { type: Number, default: 0 }, // Stock quantity
  images: [{ type: String }], // Array of image URLs
  category: { type: String, required: true }, // Product category
  brand: { type: String }, // Brand name
  dimensions: {
    length: { type: Number }, // Length in cm
    width: { type: Number }, // Width in cm
    height: { type: Number }, // Height in cm
  }, // Product dimensions
  weight: { type: Number }, // Weight in kilograms
  barcodes: [{ type: String }], // Array of barcodes (e.g., UPC, EAN)
  ratings: { type: Number, default: 0 }, // Average product rating
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who left the review
      comment: { type: String }, // Review comment
      rating: { type: Number, required: true }, // Rating given by the user
      reviewDate: { type: Date, default: Date.now }, // Review creation date
    },
  ], // Array of reviews
  isFeatured: { type: Boolean, default: false }, // Whether the product is featured
  tags: [{ type: String }], // Array of tags for filtering/search
  createdAt: { type: Date, default: Date.now }, // Product creation date
  updatedAt: { type: Date, default: Date.now }, // Product last updated date
  embedding: { type: [Number], default: [] }, // Embedding vector for RAG
});

module.exports = mongoose.model('Product', productSchema);