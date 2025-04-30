const express = require("express")
const adminController = require("../Controller/adminController")
const { verifyAdmin } = require("../Middleware/auth")
const router = express.Router()

router.get("/employee/:id", verifyAdmin, adminController.getEmployee)
router.get("/admin/:id", verifyAdmin, adminController.getAdmin)
router.get("/employee_all", verifyAdmin, adminController.getAllEmployee)
router.get("/admin_all", verifyAdmin, adminController.getAllAdmin)

router.post("/employee", verifyAdmin, adminController.registerEmployee)
router.post("/admin", verifyAdmin, adminController.registerAdmin)

router.put("/employee/:id", verifyAdmin, adminController.updateEmployee)
router.put("/admin/:id", verifyAdmin, adminController.updateAdmin)

router.delete("/employee/:id", verifyAdmin, adminController.deleteEmployee)
router.delete("/admin/:id", verifyAdmin, adminController.deleteAdmin)

module.exports = router