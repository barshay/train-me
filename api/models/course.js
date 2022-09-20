const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  lessonTime: { type: Number, required: true },
  cost: { type: Number, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
  customer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
  // location: {}
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

