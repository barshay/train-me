const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  messagetitle: { type: String, required: true },
  message: { type: String, required: true },
  contactmethod: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  createdat: { type: Date, default: Date.now() },
  //user
});

const ContactUs = mongoose.model("Contacts", contactUsSchema);


module.exports = ContactUs;