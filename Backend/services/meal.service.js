const meals = require("../models/meal");
const characterStats = require("../logic/characterStats");

async function createMeal(userId, title, protein, carbs, fats, calories, notes, imagePath) {

    if (!userId || !title || !calories || !protein) {
    throw new Error("User ID, title, calories, and protein are required");
    }

    const meal = new meals({ userId, title, protein, carbs, fats, calories, notes, imagePath });

    await characterStats.buffCharacterHealth(userId, protein);

    await meal.save();

    return meal;
 
}

async function getAllUserMeals(userId) {

  if (!userId) {
    throw new Error("User ID is required");
  } 

  return await meals.find({ userId });
 
}

async function getMeal(id) {

  if (!id) {
    throw new Error("ID is required");
  }

  const meal = await meals.findById(id);

  if (!meal) {
    throw new Error("Meal not found");
  }

  return meal;
}

async function getAllMeals() {
  return await meals.find();
}


module.exports = {
  createMeal,
  getAllUserMeals,
  getMeal,
  getAllMeals
};