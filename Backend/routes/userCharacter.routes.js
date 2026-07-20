const express = require("express");
const router = express.Router();

const controller = require("../controllers/userCharacter.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, controller.create); 

router.get("/get/:id", controller.getOne);
router.get("/get-me", authMiddleware, controller.getMe);

module.exports = router;