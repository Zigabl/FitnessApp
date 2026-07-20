const userCharacterService = require("../services/userCharacter.service");

async function create(req, res) {

  try {
    const { name } = req.body;
    const userId = req.session.userId; 
    const userCharacter = await userCharacterService.createUserCharacter(userId, name);

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

async function getOne(req, res) {

  try {
    const { id } = req.params;
    const userCharacter = await userCharacterService.getUserCharacter(id);

    res.json({
      success: true,
      userCharacter,
      message: "User character retrieved successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

async function getMe(req, res) {

  try {
    const userId = req.session.userId;
    const userCharacter = await userCharacterService.getMyCharacter(userId);

    res.json({
      success: true,
      userCharacter,
      message: "Your character retrieved successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}


module.exports = {
  create,
  getOne,
  getMe
};