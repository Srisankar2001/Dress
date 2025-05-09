const express = require("express")
const authController = require("../Controller/authController")
const { verify } = require("../Middleware/auth")
const router = express.Router()

router.get("/get",verify,authController.getData)
router.post("/login",authController.login)
router.post("/register",authController.register)
router.post("/logout",verify,authController.logout)

module.exports = router