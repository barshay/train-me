const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    profilePic: { type: String, required: true }
});

const Trainer = mongoose.model("User", trainerSchema);

module.exports = Trainer;