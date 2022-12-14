const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profilepic: { type: String, default: 'PICTURE' },
  //install a package when no profile pic is provided , the default will be a default regular profile pic
  password: { type: String, required: true },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  }
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;