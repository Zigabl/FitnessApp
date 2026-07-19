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

    req.session.userId = user._id; 
    req.session.email = user.email;

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

async function logout(req, res) {

  try {
    req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
}

module.exports = {
  register,
  login,
  logout
};