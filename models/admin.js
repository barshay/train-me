const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String, required: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("Product", adminSchema);


module.exports = Admin;