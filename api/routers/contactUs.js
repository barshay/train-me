const express = require("express");
const app = express();

const { getAllContactInquiries,
    addNewPostOfContact,
    getContactById,
    deleteContactById,
    deleteAllContactInquiries
} = require("../controllers/contactUs");

app.post("/", addNewPostOfContact);
app.get("/", getAllContactInquiries);
app.get("/:inquiryId", getContactById);
app.delete("/:inquiryId", deleteContactById);
app.delete("/", deleteAllContactInquiries);

module.exports = app;
