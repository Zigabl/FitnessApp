require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const userCharacterRoutes = require("./routes/userCharacter.routes");
const authRoutes = require("./routes/auth.routes");
const workoutRoutes = require("./routes/workout.routes");
const mealRoutes = require("./routes/meal.routes");

const app = express();

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}));

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
app.use("/api/workout", workoutRoutes);
app.use("/api/meal", mealRoutes);

module.exports = app;