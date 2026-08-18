const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: false},
  fats: { type: Number, required: false },
  calories: { type: Number, required: true },
  notes: { type: String, required: false },
  imagePath: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", mealSchema);