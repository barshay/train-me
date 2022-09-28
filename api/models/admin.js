const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true },
  profilePic: { type: String },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);


module.exports = Admin;

