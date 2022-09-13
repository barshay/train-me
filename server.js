const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
// const Questions = require("./models/question");

const app = express();

require("dotenv").config()

app.use(express.json());
// app.use(express.static("client/build"))
app.use(cors())


/** MODELS + API's */
//Customer API
const {
  addNewCustomer,
  getAllCustomer,
  deleteCustomer,
  getCustomerById,
} = require("./controllers/customerController");
//Trainer API
const {
  getAllTrainer,
  addNewTrainer,
  getTrainerById,
  deleteTrainer,
} = require("./controllers/trainerController");

/** ROUTES */
//Customer Routes
app.post("/api/customer", addNewCustomer);
app.get("/api/customers", getAllCustomer);
app.delete("/api/customer/:customerID", deleteCustomer);
app.get("/api/customer/:customerID", getCustomerById);

//Trainer Routes
app.get("/api/trainers", getAllTrainer);
app.delete("/api/trainer/:trainerID", deleteTrainer);
app.get("/api/trainer/:trainerID", getTrainerById);
app.post("/api/trainer", addNewTrainer);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/client/build/index.html")
// })

// const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;

// mongoose.connect(
//     `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//         app.listen(PORT || 8000, () => {
//             console.log("err", err);
//             console.log("Ani maazin!");
//         });
//     }
// );

mongoose.connect('mongodb://localhost:27017/train-me', { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080/');
})