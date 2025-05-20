const express = require("express")
const mailController = require("../Controller/mailController")
const router = express.Router()

router.post("/send",mailController.sendMail)

module.exports = router