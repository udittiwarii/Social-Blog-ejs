const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {

    try {
        const { username, email, password, fullName } = req.body;
        
        // Validate required fields
        if (!username || !email || !password || !fullName) {
            return res.status(400).render("register", { error: "All fields are required" })
        }

        // Check if user exists
        const isUserExist = await userModel.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });
        if (isUserExist) {
            return res.status(400).render("register", { error: "User already exists" })
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            fullName,
            email,
            password: hashedPassword
        })

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        
        res.status(201).redirect("/")
    } catch (error) {
        console.error("Register error:", error)
        res.status(500).render("register", { error: "Internal server error" })
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).render("login", { error: "Email and password are required" })
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).render("login", { error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).render("login", { error: "Invalid password" });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        
        res.status(200).redirect("/")
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).render("login", { error: "Internal server error" });
    }
}

const logoutController = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

// Render login page
const renderLoginPage = (req, res) => {
    // If already logged in, redirect to home
    if (req.user) return res.redirect('/')
    res.render('login', { error: null })
}

// Render register page
const renderRegisterPage = (req, res) => {
    if (req.user) return res.redirect('/')
    res.render('register', { error: null })
}

module.exports = {
    registerController , 
    loginController,
    logoutController
    , renderLoginPage, renderRegisterPage
}