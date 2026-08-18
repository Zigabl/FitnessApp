const workouts = require("../models/workout");
const characterStats = require("../logic/characterStats");

async function createWorkout(userId, title, durationHours, notes, imagePath) {

    if (!userId || !title || !durationHours) {
    throw new Error("User ID, title, and duration are required");
    }

    const workout = new workouts({ userId, title, durationHours, notes, imagePath });

    await characterStats.buffCharacterStrength(userId, durationHours);

    await workout.save();

    return workout;
 
}

async function getAllUserWorkouts(userId) {

  if (!userId) {
    throw new Error("User ID is required");
  } 

  return await workouts.find({ userId });
 
}

async function getWorkout(id) {

  if (!id) {
    throw new Error("ID is required");
  }

  const workout = await workouts.findById(id);

  if (!workout) {
    throw new Error("Workout not found");
  }

  return workout;
}

module.exports = {
  createWorkout,
  getAllUserWorkouts,
  getWorkout
};