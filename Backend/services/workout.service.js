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

module.exports = {
  createWorkout
};