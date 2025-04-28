const express = require("express")
const { verifyAdmin, verifyUser, verifyEmployee } = require("../Middleware/auth")
const orderItemController = require("../Controller/orderItemController")
const router = express.Router()

router.get("/user/:id", verifyUser, orderItemController.getOrderItemUser)
router.get("/admin/:id", verifyAdmin, orderItemController.getOrderItemAdmin)
router.get("/employee/:id", verifyEmployee, orderItemController.getOrderItemEmployee)
router.get("/user", verifyUser, orderItemController.getAllOrderItemsUser)
router.get("/user/order/:id", verifyUser, orderItemController.getAllOrderItemsUserForOrderId)
router.get("/admin", verifyAdmin, orderItemController.getAllOrderItemsAdmin)
router.get("/admin/order/:id", verifyAdmin, orderItemController.getAllOrderItemsAdminForOrderId)
router.get("/employee", verifyEmployee, orderItemController.getAllOrderItemsEmployee)

router.put("/user/:id", verifyUser, orderItemController.updateOrderItemUser)
router.put("/admin/:id", verifyAdmin, orderItemController.updateOrderItemAdmin)
router.put("/employee/accept/:id", verifyEmployee, orderItemController.updateOrderItemEmployeeAccept)
router.put("/employee/not_accept/:id", verifyEmployee, orderItemController.updateOrderItemEmployeeNotAccept)
router.put("/employee/complete/:id", verifyEmployee, orderItemController.updateOrderItemEmployeeComplete)

module.exports = router