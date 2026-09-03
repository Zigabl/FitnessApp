const express = require("express");
const router = express.Router();

const controller = require("../controllers/workout.controller");
const authMiddleware = require("../middleware/auth.middleware");
const uploadWorkoutMiddleware = require("../middleware/workoutImage.middleware");

router.post("/create", authMiddleware, uploadWorkoutMiddleware.single("workoutImage"), controller.create);

router.get("/all", authMiddleware, controller.getAll);
router.get("/get/:id", authMiddleware, controller.getOne); 

module.exports = router;