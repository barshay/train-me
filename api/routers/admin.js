const express = require("express");
const app = express();

const { getAdmin, signup, login, uploadAdminImage } = require("../controllers/admin");

app.post("/signup", signup);
app.post("/login", login);

app.get("/", getAdmin);
// app.post("/image", uploadAdminImage);

module.exports = app;
