const express = require("express");
const cors = require("cors");
const adminRoutes = require("./api/routers/admin");
const contactUsRoutes = require("./api/routers/contactUs");
const courseRoutes = require("./api/routers/course");
const customerRoutes = require("./api/routers/customer");
// const questionRoutes = require("./api/routers/question");
const trainerRoutes = require("./api/routers/trainer");

const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
// app.use(express.static("client/build"))
app.use(cors());

//ROUTES
app.use("/admin", adminRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/course", courseRoutes);
app.use("/customer", customerRoutes);
// app.use("/question", questionRoutes);
app.use("/trainer", trainerRoutes);

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
