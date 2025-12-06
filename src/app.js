const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")

// Import routers
const authRouter = require("./router/auth.route")
const postRouter = require("./router/post.route")
const profileRouter = require("./router/profile.route")

// Import controller
const postController = require("./controller/post.controller")
const authMiddleware = require("./middleware/auth.middleware")

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "../public")))

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))

// Optional user middleware - loads user data if cookie exists, doesn't require authentication
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const jwt = require("jsonwebtoken")
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userModel = require("./model/user.model")
            const user = await userModel.findById(decoded.id);
            req.user = user;
        }
    } catch (error) {
        // Token invalid or expired - continue without user
    }
    next()
}

// Routes
app.use(optionalAuth)
app.get("/", postController.getAllPosts)
app.use("/auth", authRouter)
app.use("/posts", postRouter)
app.use("/profile", profileRouter)

// Handle 404 - redirect to home
app.use((req, res) => {
    res.status(404).render("error", { message: "Page not found" })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render("error", { message: "Something went wrong!" })
})

module.exports = app;