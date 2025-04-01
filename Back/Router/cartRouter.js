const express = require("express")
const { verifyUser} = require("../Middleware/auth")
const cartController = require("../Controller/cartController")
const router = express.Router()

router.get("/get/:id",verifyUser,cartController.getCartItem)
router.get("/getAll",verifyUser,cartController.getAllCartItems)
router.post("/create",verifyUser,cartController.createCartItem)
router.put("/update/:id",verifyUser,cartController.updateCartItem)
router.delete("/delete/:id",verifyUser,cartController.deleteCartItem)

module.exports = router