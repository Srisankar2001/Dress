const express = require("express")
const { verifyUser } = require("../Middleware/auth")
const paymentController = require("../Controller/paymentController")
const router = express.Router()

router.post("/create",verifyUser,paymentController.createPayment)

module.exports = router