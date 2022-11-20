const express = require("express");
const app = express();

const { 
    addNewCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById,
    getCourseCustomersData,
    getAllAdminCourses,
    deleteAllCourses
} = require("../controllers/course");

app.post("/", addNewCourse);
app.post("/courseCustomers", getCourseCustomersData);
app.put("/:courseId", updateCourse);
app.get("/", getAllCourses);
app.get("/admincourses", getAllAdminCourses);
app.get("/:courseId", getCourseById);
app.delete("/:courseId", deleteCourseById);
// app.delete("/", deleteAllCourses);

module.exports = app;