const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastname: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    phone: { type:String, required: true},
    email: { type: String, required: true},
    messageTitle: { type: String, required: true },
    message: { type: String, required: true},
    //user
});

const ContactUs = mongoose.model("Contacts", contactUsSchema);


module.exports = ContactUs;