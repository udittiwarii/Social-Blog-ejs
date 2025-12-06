const multer = require("multer")

// Use memory storage for direct upload to ImageKit
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    // Allow only image files
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only image files are allowed (jpeg, png, gif, webp)"), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})

module.exports = upload
