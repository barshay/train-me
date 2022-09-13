const express = require("express");
const cors = require("cors");
// const serverResponse = require('./utils/serverResponse')
// const { productAllowedUpdates } = require('./constants/allowedUpdates')
const app = express();
const mongoose = require("mongoose");

const trainerRoutes = require("./api/routers/trainer");

require("dotenv").config(); //TODO: Learn why needed

app.use(express.json());
app.use(express.static("client/build")); //TODO: Learn why needed
app.use(cors());

//ROUTES

app.use("/trainer", trainerRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello World!!");
// });

// app.get("/api/questions", async (req, res) => {
//   try {
//     const allQuestions = await Questions.find({})
//     return serverResponse(res, 200, allQuestions)
//   } catch (e) {
//     return serverResponse(res, 500, { message: "internal error occured" + e })
//   }
// })

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/client/build/index.html")
// })

mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(
//   `mongodb+srv://barshay:gqdOjE08Iesnq5sq@train-me.fsf7jdu.mongodb.net/?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

// mongoose.connect(
//   `mongodb+srv://barshay:gqdOjE08Iesnq5sq@train-me.fsf7jdu.mongodb.net/?retryWrites=true&w=majority`,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     app.listen(PORT || 8000, () => {
//       console.log("err", err);
//       console.log("Ani maazin!");
//     });
//   }
// );
app.listen(8000, () => {
  console.log("Server running at http://127.0.0.1:8000/");
});
