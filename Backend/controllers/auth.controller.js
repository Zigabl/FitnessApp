const authService = require("../services/auth.service");

async function register(req, res) {

  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);

    res.json({
      success: true,
      user,
      message: "User registered successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

async function login(req, res) {

  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);

    res.json({
      success: true,
      user,
      message: "User logged in successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  register,
  login
};