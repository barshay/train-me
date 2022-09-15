const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, required: true },
  password: { type: String, required: true },
  // isTrainer: { type: Boolean, required: true },
  // rating: {
  //     // type: Object,
  //     rate: Number,
  //     count: Number
  // },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
    default: "male",
  },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
