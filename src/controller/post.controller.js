const postModel = require("../model/post.model")
const { uploadImage } = require("../service/imagekit.service")

// Get compose post page
const getComposePage = async (req, res) => {
    try {
        res.render("compose", { user: req.user })
    } catch (error) {
        console.error("Get compose page error:", error)
        res.status(500).render("error", { message: "Internal server error" })
    }
}

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!title || !content) {
            return res.status(400).render("compose", { 
                user: req.user, 
                error: "Title and content are required" 
            })
        }

        const postData = {
            title: title.trim(),
            content: content.trim(),
            author: userId,
            imageUrl: null
        }

        // Handle image upload if provided
        if (req.file) {
            try {
                const result = await uploadImage(req.file);
                postData.imageUrl = result.url;
            } catch (uploadError) {
                console.error("Image upload error:", uploadError)
                return res.status(400).render("compose", { 
                    user: req.user, 
                    error: "Failed to upload image" 
                })
            }
        }

        const newPost = await postModel.create(postData);

        res.redirect("/")
    } catch (error) {
        console.error("Create post error:", error)
        res.status(500).render("compose", { 
            user: req.user, 
            error: "Internal server error" 
        })
    }
}

// Get all posts for home page
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
            .sort({ createdAt: -1 })
            .populate("author", "username fullName profilePic")

        res.render("home", { posts, user: req.user || null })
    } catch (error) {
        console.error("Get all posts error:", error)
        res.status(500).render("error", { message: "Internal server error" })
    }
}

module.exports = {
    getComposePage,
    createPost,
    getAllPosts
}
