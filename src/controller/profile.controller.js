const userModel = require("../model/user.model")
const postModel = require("../model/post.model")
const { uploadImage } = require("../service/imagekit.service")
const path = require("path")

// Get user's profile with posts
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).render("error", { message: "User not found" })
        }

        const posts = await postModel.find({ author: userId })
            .sort({ createdAt: -1 })
            .populate("author", "username fullName profilePic")

        res.render("profile", { user, posts, isOwnProfile: true })
    } catch (error) {
        console.error("Get profile error:", error)
        res.status(500).render("error", { message: "Internal server error" })
    }
}

// Get other user's profile
const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(404).render("error", { message: "User not found" })
        }

        const posts = await postModel.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "username fullName profilePic")

        const isOwnProfile = req.user && req.user._id.toString() === user._id.toString();

        res.render("profile", { user, posts, isOwnProfile })
    } catch (error) {
        console.error("Get user profile error:", error)
        res.status(500).render("error", { message: "Internal server error" })
    }
}

// Get edit profile page
const getEditProfilePage = async (req, res) => {
    try {
        const user = req.user;
        res.render("editProfile", { user })
    } catch (error) {
        console.error("Get edit profile page error:", error)
        res.status(500).render("error", { message: "Internal server error" })
    }
}

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { fullName, username, bio } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!fullName || !username) {
            return res.status(400).render("editProfile", { 
                user: req.user, 
                error: "Full name and username are required" 
            })
        }

        // Check if new username is already taken
        if (username !== req.user.username) {
            const existingUser = await userModel.findOne({ username: username });
            if (existingUser) {
                return res.status(400).render("editProfile", { 
                    user: req.user, 
                    error: "Username already taken" 
                })
            }
        }

        const updateData = {
            fullName,
            username: username.toLowerCase(),
            bio: bio || ""
        }

        // Handle profile picture upload
        if (req.file) {
            try {
                const result = await uploadImage(req.file);
                updateData.profilePic = result.url;
            } catch (uploadError) {
                console.error("Image upload error:", uploadError)
                return res.status(400).render("editProfile", { 
                    user: req.user, 
                    error: "Failed to upload profile picture" 
                })
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        )

        res.redirect("/profile")
    } catch (error) {
        console.error("Update profile error:", error)
        res.status(500).render("editProfile", { 
            user: req.user, 
            error: "Internal server error" 
        })
    }
}

module.exports = {
    getProfile,
    getUserProfile,
    getEditProfilePage,
    updateProfile
}
