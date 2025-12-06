const express = require("express")
const authController = require('../controller/auth.controller')

const router = express.Router()

// Render pages
router.get('/register', authController.renderRegisterPage)
router.get('/login', authController.renderLoginPage)

// Form actions
router.post('/register', authController.registerController)
router.post('/login', authController.loginController)
router.get('/logout', authController.logoutController)

module.exports = router