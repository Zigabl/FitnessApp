const workoutService= require("../services/workout.service");

async function create(req, res) {

  try {
    const { title, durationHours, notes, imagePath } = req.body;
    const userId = req.session.userId;
    const workout = await workoutService.createWorkout(userId, title, durationHours, notes, imagePath);

    res.json({
      success: true,
      workout,
      message: "Workout created successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  create
};