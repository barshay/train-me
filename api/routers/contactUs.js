const express = require("express");
const app = express();

const { 
    getAllContactInquiries,
    PostContact,
    getContactById,
    deleteContactById,
    deleteAllContactInquiries
} = require("../controllers/contactUs");

app.post("/", PostContact);
app.get("/", getAllContactInquiries);
app.get("/:inquiryId", getContactById);
app.delete("/:inquiryId", deleteContactById);
app.delete("/", deleteAllContactInquiries);

module.exports = app;
