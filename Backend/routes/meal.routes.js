const express = require("express");
const router = express.Router();

const controller = require("../controllers/meal.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, controller.create);

router.get("/all-me", authMiddleware, controller.getAllUser);
router.get("/get/:id", authMiddleware, controller.getOne); 
router.get("/all", authMiddleware, controller.getAll);

module.exports = router;