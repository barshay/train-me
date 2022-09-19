const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, required: true },
  password: { type: String, required: true },
  // isTrainer: { type: Boolean, required: true },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  customerCourses: [],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
