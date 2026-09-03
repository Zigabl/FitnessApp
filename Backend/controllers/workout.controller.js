const workoutService= require("../services/workout.service");

async function create(req, res) {

  try {
    const { title, durationHours, notes} = JSON.parse(req.body.workout); //{} are used for deconstructing the object, so we can get the values directly from the body instead of using req.body.title                                        
    const imagePath = req.file ? req.file.path : null;                  //had to add JSON.parse so it can read from form-data (postman) -> needed so we can send files and text data in the same request
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

async function getAll(req, res) {

  try {
    const { userId } = req.session;
    const userWorkouts = await workoutService.getAllUserWorkouts(userId);

    res.json({
      success: true,
      workouts: userWorkouts
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

async function getOne(req, res) {

  try {
    const { id } = req.params; 
    const workout = await workoutService.getWorkout(id);

    res.json({
      success: true,
      workout
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  create,
  getAll,     
  getOne
};