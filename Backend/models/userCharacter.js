const mongoose = require("mongoose");

const userCharacterSchema = new mongoose.Schema({
  name: String,
  health: Number,
  strength: Number,
  intelligence: Number
});

module.exports = mongoose.model("UserCharacters", userCharacterSchema);