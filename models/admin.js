const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // user:{type: Schema.Types.ObjectId, ref: 'User'} 
});

const Admin = mongoose.model("Product", adminSchema);


module.exports = Admin;