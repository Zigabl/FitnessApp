const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  durationHours: { type: Number, required: true },
  notes: { type: String, required: false },
  imagePath: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", workoutSchema);