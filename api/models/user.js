const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  /**
   install a package when no profile pic is provided, 
   the default will be a default regular profile pic
  */
  profilePic: { type: String, default: "PICTURE" },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  role: { type: String, required: true },
  // customerCourses: [
  //     { type: Schema.Types.ObjectId, ref: 'Course', default: 'Not yet registered for course' }
  // ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;