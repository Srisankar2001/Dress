const express = require("express")
const { verifyAdmin, verifyUser } = require("../Middleware/auth")
const orderController = require("../Controller/orderController")
const router = express.Router()

router.get("/user", verifyUser, orderController.getOrderUser)
router.get("/admin", verifyAdmin, orderController.getOrderAdmin)
router.post("/create", verifyUser, orderController.createOrder)
router.put("/cancel/:id", verifyUser, orderController.cancelOrder)
router.put("/complete/:id", verifyUser, orderController.completeOrder)

module.exports = router