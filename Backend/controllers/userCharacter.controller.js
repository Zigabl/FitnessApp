const userCharacterService = require("../services/userCharacter.service");

async function create(req, res) {

  try {
    const { name } = req.body;
    const userCharacter = await userCharacterService.createUserCharacter(name);

    res.json({
      success: true,
      userCharacter,
      message: "User character created successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  create
};