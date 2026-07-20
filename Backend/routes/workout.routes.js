const express = require("express");
const router = express.Router();

const controller = require("../controllers/workout.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, controller.create);

module.exports = router;