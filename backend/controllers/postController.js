const Post = require('../models/Post'); 
const aiService = require('../services/aiService'); 

// (GET /api/posts)
exports.getPosts = async (req, res) => {
    const {searchKeyword}=req.query

    try {
        if (searchKeyword){

            const posts=await Post.find({
                $text:{$search:searchKeyword}
            })
            res.json(posts);
        }
        else {
        const posts = await Post.find(); 
        res.json(posts);}
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// (GET /api/posts/:id)
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); 
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Cannot be found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// (POST /api/posts)
exports.createPost = async (req, res) => {
    try {
        const { title, content, images, contact } = req.body;

        // input validation
        if (!title || !content || !images || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newPost = new Post({
            title,
            content,
            images,
            contact
        });

        await newPost.save(); 
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Post Failure' });
    }
};

// (POST /api/posts/createAI)
exports.createPostAI = async (req, res) => {
    try {
        const userInput = req.body.input;
        const aiResponse = await aiService.getAIResponse(userInput);
        res.status(200).json({ success: true, aiResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occured on AI processing' });
    }
};

// (DELETE /api/posts/:id)
exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (post) {
            res.json({ success: true, message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};