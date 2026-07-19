const express = require("express");
const router = express.Router();

const controller = require("../controllers/userCharacter.controller");

router.post("/create", controller.create); 

router.get("/get/:id", controller.getOne);

module.exports = router;