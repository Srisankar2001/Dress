const express = require("express")
const { verify, verifyAdmin } = require("../Middleware/auth")
const sizeController = require("../Controller/sizeController")
const router = express.Router()

router.get("/get/:id",verify,sizeController.getSize)
router.get("/getAll",verify,sizeController.getAllSize)
router.post("/create",verifyAdmin,sizeController.createSize)
router.put("/update/:id",verifyAdmin,sizeController.updateSize)
router.delete("/delete/:id",verifyAdmin,sizeController.deleteSize)

module.exports = router