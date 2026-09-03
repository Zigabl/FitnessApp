const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/logout", authMiddleware, controller.logout);
router.post("/register", controller.register); 
router.post("/login", controller.login);

// -----=====[ DODAL NOV FUNCTION ]=====-----
router.get("/me", authMiddleware, controller.getCurrentUser);
// -----=====[ DODAL NOV FUNCTION ]=====-----

module.exports = router;