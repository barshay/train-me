const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  /**
   install a package when no profile pic is provided, 
   the default will be a default regular profile pic
  */
  profilepic: { type: String, default: "PICTURE" },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  // customerCourses: [
  //     { type: Schema.Types.ObjectId, ref: 'Course', default: 'Not yet registered for course' }
  // ],
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;