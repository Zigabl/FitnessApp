require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userCharacterRoutes = require("./routes/userCharacter.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fitness app API is running");
});

app.use("/api/userCharacter", userCharacterRoutes);

module.exports = app;