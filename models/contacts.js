const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastname: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    phone: { type:Number, required: true},
    email: { type: String, required: true},
    messageTitle: { type: String, required: true },
    message: { type: String, required: true},
});

const Contacts = mongoose.model("Contacts", contactsSchema);


module.exports = Contacts;