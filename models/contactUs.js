const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    phone: { type:String, required: true},
    email: { type: String, required: true},
    messageTitle: { type: String, required: true },
    message: { type: String, required: true},
    contactMethod: {type: String, required: true},
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    createdAt: { type: Date, default: Date.now() },
    //user
});

const ContactUs = mongoose.model("Contacts", contactUsSchema);


module.exports = ContactUs;