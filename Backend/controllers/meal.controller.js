const workoutService= require("../services/meal.service");

async function create(req, res) {

  try {
    const { title, protein, carbs, fats, calories, notes, imagePath } = req.body; //{} are used for deconstructing the object, so we can get the values directly from the body instead of using req.body.title
    const userId = req.session.userId;
    const meal = await workoutService.createMeal(userId, title, protein, carbs, fats, calories, notes, imagePath);

    res.json({
      success: true,
      meal,
      message: "Meal created successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

async function getAllUser(req, res) {

  try {
    const { userId } = req.session;
    const userMeals = await workoutService.getAllUserMeals(userId);

    res.json({
      success: true,
      meals: userMeals
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
    const meal = await workoutService.getMeal(id);

    res.json({
      success: true,
      meal
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
    const meals = await workoutService.getAllMeals();

    res.json({
      success: true,
      meals
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
  getOne,
  getAllUser
};