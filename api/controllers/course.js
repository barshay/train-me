const Course = require("../models/course");
const serverResponse = require('../utils/serverResponse');
// const { allowedUpdates } = require('../../constants/allowedUpdates');


module.exports = {
    addNewCourse: async (req, res) => {
        try {
            const newCourse = new Course({ ...req.body });
            await newCourse.save();
            return serverResponse(res, 200, newCourse);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const allCourses = await Course.find({});
            return serverResponse(res, 200, allCourses);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },
    getCourseById: async (req, res) => {
        try {
            console.log(req.params);
            const courseID = req.params.courseId;
            const course = await Course.findOne({ _id: courseID });
            return serverResponse(res, 200, course);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },

    deleteCourseById: async (req, res) => {
        try {
            console.log(req.params);
            const courseID = req.params.courseId;
            const course = await Course.findOneAndDelete({ _id: courseID });
            return serverResponse(res, 200, course);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },

    deleteAllCourses: async (req, res) => {
        try {
            const allCourses = await Course.deleteMany({});
            return serverResponse(res, 200, allCourses);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    }
};
