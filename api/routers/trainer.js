const express = require("express");
const app = express();

const {
  signup,
  login,
  getAllTrainers,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainer");

app.post("/signup", signup);
app.post("/login", login);
app.get("/", getAllTrainers);
app.patch("/:trainerId", updateTrainer);
app.delete("/:trainerId", deleteTrainer);

module.exports = app;
