const userCharacters = require("../models/userCharacter");

async function createUserCharacter(name) {

  if (!name) {
    throw new Error("Name is required");
  }
  
  const existingCharacter = await userCharacters.findOne({ name });

  if (existingCharacter) {
    throw new Error("Name already in use");
  }

  const userCharacter = new userCharacters({ name, health: 100, strength: 10, intelligence: 10 }); //default stats for every new character

  await userCharacter.save();

  return userCharacter;
}

module.exports = {
  createUserCharacter,
};