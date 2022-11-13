const express = require("express");
const app = express();

const { 
    addNewCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById,
    deleteAllCourses
} = require("../controllers/course");

app.post("/", addNewCourse);
app.put("/:courseId", updateCourse);
app.get("/", getAllCourses);
app.get("/:courseId", getCourseById);
app.delete("/:courseId", deleteCourseById);
// app.delete("/", deleteAllCourses);

module.exports = app;