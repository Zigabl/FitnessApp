const mongoose = require("mongoose");

const userCharacterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  health: { type: Number, required: true },
  strength: { type: Number, required: true },
  intelligence: { type: Number, required: true }
});

module.exports = mongoose.model("UserCharacter", userCharacterSchema);