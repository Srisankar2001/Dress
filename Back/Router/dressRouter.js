const express = require("express")
const upload = require("../Middleware/upload")
const { verify, verifyAdmin } = require("../Middleware/auth")
const dressController = require("../Controller/dressController")
const router = express.Router()

router.get("/get/:id",verify,dressController.getDress)
router.get("/getAll/:type_id?",verify,dressController.getAllDress)
router.post("/create",verifyAdmin,upload.single("image"),dressController.createDress)
router.put("/updateWithImage/:id",verifyAdmin,upload.single("image"),dressController.updateDressWithImage)
router.put("/updateWithoutImage/:id",verifyAdmin,dressController.updateDressWithoutImage)
router.delete("/delete/:id",verifyAdmin,dressController.deleteDress)

module.exports = router