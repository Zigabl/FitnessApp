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

async function getUserCharacter(id) {

  if (!id) {
    throw new Error("ID is required");
  }

  const userCharacter = await userCharacters.findById(id);

  if (!userCharacter) {
    throw new Error("User character not found");
  }

  return userCharacter;
}

module.exports = {
  createUserCharacter,
  getUserCharacter
};