const userCharacters = require("../models/userCharacter");

async function createUserCharacter(userId, name) {

  if (!name || !userId) {
    throw new Error("Name and user ID are required");
  }
  
  const existingCharacter = await userCharacters.findOne({ name });

  if (existingCharacter) {
    throw new Error("Name already in use");
  }

  const userCharacter = new userCharacters({ userId, name, health: 100, strength: 10, intelligence: 10 }); //default stats for every new character

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

async function getMyCharacter(userId) {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const userCharacter = await userCharacters.findOne({ userId });

  if (!userCharacter) {
    throw new Error("Your character not found");
  }

  return userCharacter;
}

async function getAllUserCharacters() {
  return await userCharacters.find();
}

module.exports = {
  createUserCharacter,
  getUserCharacter,
  getMyCharacter,
  getAllUserCharacters
};