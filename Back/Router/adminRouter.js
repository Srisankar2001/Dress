const express = require("express")
const adminController = require("../Controller/adminController")
const { verifyAdmin } = require("../Middleware/auth")
const router = express.Router()

router.get("/employee/:id",verifyAdmin,adminController.getEmployee)
router.get("/employee_all",verifyAdmin,adminController.getAllEmployee)
router.post("/admin",verifyAdmin,adminController.registerAdmin)
router.post("/employee",verifyAdmin,adminController.registerEmployee)
router.put("/employee/:id",verifyAdmin,adminController.updateEmployee)

module.exports = router