const express = require("express");
const app = express();

const { addNewCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById,
    deleteAllCourses
} = require("../controllers/course");

app.post("/", addNewCourse);
app.get("/", getAllCourses);
app.get("/:courseId", getCourseById);
//TODO: Add update course function
app.delete("/:courseId", deleteCourseById);
app.delete("/", deleteAllCourses);

module.exports = app;