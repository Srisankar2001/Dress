const express = require("express")
const { verifyAdmin, verifyUser, verify} = require("../Middleware/auth")
const feedbackController = require("../Controller/feedbackController")
const router = express.Router()

router.get("/user/:id", verifyUser, feedbackController.getUser)
router.get("/admin/:id", verifyAdmin, feedbackController.getAdmin)
router.get("/user", verifyUser, feedbackController.getAllUser)
router.get("/admin", verifyAdmin, feedbackController.getAllAdmin)

router.post("/create",verifyUser, feedbackController.createQuestion)

router.put("/user/:id", verifyUser, feedbackController.updateQuestion)
router.put("/admin/:id", verifyAdmin, feedbackController.answerQuestion)

router.delete("/delete/:id",verify, feedbackController.deleteQuestion)
module.exports = router