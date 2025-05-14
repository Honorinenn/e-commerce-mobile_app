const mongoose = require('mongoose');

// Post Schema Description
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postCreatedAt: { type: Date, default: Date.now },
    images: {type: [String], required: true},
    contact: { type: String, required: true },
});
postSchema.index({ title: "text", content: "text" });
// Model Generation
const Post = mongoose.model('Post', postSchema);

module.exports = Post;