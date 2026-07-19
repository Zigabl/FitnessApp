require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const userCharacterRoutes = require("./routes/userCharacter.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ //store session in MongoDB
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.get("/", (req, res) => {
  res.send("Fitness app API is running");
});

app.use("/api/userCharacter", userCharacterRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;