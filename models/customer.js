const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    profilePic: { type: String, required: true }
});

const Customer = mongoose.model("User", customerSchema);

module.exports = Customer;