const express = require("express")
const dashboardController = require("../Controller/dashboardController")
const { verifyAdmin, verifyEmployee } = require("../Middleware/auth")
const router = express.Router()

router.get("/admin", verifyAdmin, dashboardController.getAdminDashboard)
router.post("/report", verifyAdmin, dashboardController.getReport)
router.get("/employee", verifyEmployee, dashboardController.getEmployeeDashboard)

module.exports = router