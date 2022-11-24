const Course = require("../models/course");
const Customer = require("../models/customer");
const Trainer = require("../models/trainer");

const serverResponse = require('../utils/serverResponse');
const { coursesAllowedUpdates } = require('../../constants/allowedUpdates');
const jwt = require("jsonwebtoken");
const cloudinary = require("../../cloudinary/cloudinary");


module.exports = {
    addNewCourse: async (req, res) => {
        const { name, category, pictureToDB, cost, description, lessontime, date, trainer, customers } =
            req.body;

        let cloImageResult = '';
        await cloudinary.uploader.upload(pictureToDB,
            {
                folder: "trainme_courses_avatar",
                upload_preset: 'unsigned_upload_course',
                public_id: `${name}${date}_avatar`,
                allowed_formats: ['jpeg, jpg, png, svg, ico, jfif, webp']
            },
            function (error, result) {
                if (error) {
                    console.log("error from cloudinary");
                    console.log(error);
                } else {
                    cloImageResult = result;
                    // console.log("result.public_id : " + result.public_id)
                    console.log("No Error from cloudinary");
                }
            }
        );

        const picture = {
            image: pictureToDB,
            public_id: cloImageResult.public_id
        }

        const newCourse = new Course({
            name,
            category,
            picture,
            cost,
            description,
            lessontime,
            trainer,
            customers
        });

        newCourse
            .save()
            .then((result) => {
                // console.log(result);
                console.log("Course created");
                // result.status(200).json({result}),
                res.status(201).json({
                    cloImageResult,
                    result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "internal error occured" + error
                });
            });

        // try {
        //     await newCourse.save();
        //     return serverResponse(res, 201, cloImageResult);
        // } catch (e) {
        //     return serverResponse(res, 500, { message: "internal error occurred " + e });
        // }
    },

    updateCourse: async (req, res) => {
        try {
            const updates = Object.keys(req.body);
            // console.log(updates)
            const isValidOperation = updates.every((update) =>
                coursesAllowedUpdates.includes(update)
            );
            if (!isValidOperation) {
                return serverResponse(res, 400, { message: "Invalid updates" });
            }

            const courseProduct = await Course.findById(req.params.courseId);
            if (!courseProduct) {
                return serverResponse(res, 404, { message: "course does not exist" });
            }
            // console.log("Course Product", courseProduct.picture.public_id)
            const imgId = courseProduct.picture.public_id;
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }

            let cloImageResult = '';
            await cloudinary.uploader.upload(req.body.picture,
                {
                    folder: "trainme_courses_avatar",
                    upload_preset: 'unsigned_upload_course',
                    public_id: `${courseProduct.name}${Date.now()}_avatar`,
                    allowed_formats: ['jpeg, jpg, png, svg, ico, jfif, webp']
                },
                function (error, result) {
                    if (error) {
                        console.log("error from cloudinary");
                        console.log(error);
                    } else {
                        cloImageResult = result;
                        // console.log("result.public_id : " + result.public_id)
                        console.log("No Error from cloudinary");
                    }
                }
            );

            const data = {
                lessontime: req.body.lessontime,
                cost: req.body.cost,
                picture: {
                    image: req.body.picture,
                    public_id: cloImageResult.public_id,
                }
            }

            updates.forEach((update) =>
                (courseProduct[update] = data[update])
            );
            await courseProduct.save();

            const trainerID = courseProduct.trainer
            console.log("trainerID: ", trainerID)
            let filteredCoursesByTrainerId = {};
            let filteredArr = [];
            const allCourses = await Course.find({})
            for (const i in allCourses) {
                if (allCourses[i].trainer.equals(trainerID)) {
                    filteredCoursesByTrainerId[i] = allCourses[i];
                    filteredArr.push(filteredCoursesByTrainerId[i]);
                } 
            }
            // console.log(filteredArr);
            return serverResponse(res, 200, filteredArr);
        } catch (err) {
            return serverResponse(res, 500, {
                message: "Internal error while trying to update course",
            });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const allCourses = await Course.find({})
            return serverResponse(res, 200, allCourses);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },

    getAllAdminCourses: async (req, res) => {
        try {
            const allCourses = await Course.find({})
            const allTrainers = await Trainer.find({})
            const allData = [];
            allData.push(allCourses, allTrainers);
            return serverResponse(res, 200, allData);
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
            const courseProduct = await Course.findById(req.params.courseId);
            // console.log("Course Product", courseProduct.picture.public_id)
            const imgId = courseProduct.picture.public_id;
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }

            await Course.findOneAndDelete({ _id: courseProduct });

            let filteredCoursesByTrainerId = {};
            let filteredArr = [];
            const allCourses = await Course.find({})
            const trainerID = courseProduct.trainer
            // console.log("courseProduct: ", courseProduct.trainer)
            for (const i in allCourses) {
                if (allCourses[i].trainer.equals(trainerID)) {
                    filteredCoursesByTrainerId[i] = allCourses[i];
                    filteredArr.push(filteredCoursesByTrainerId[i]);
                }
            }
            // console.log(filteredArr);
            return serverResponse(res, 200, filteredArr);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
        }
    },

    getAllTrainerCourses: async (req, res) => {
        const { trainerID } = req.body
        console.log("trainerID: ", trainerID)
        let filteredCoursesByTrainerId = {};
        let filteredArr = [];
        const allCourses = await Course.find({})
        try {
            for (const i in allCourses) {
                if (allCourses[i].trainer == trainerID) {
                    filteredCoursesByTrainerId[i] = allCourses[i];
                    filteredArr.push(filteredCoursesByTrainerId[i]);
                }
            }
            return serverResponse(res, 200, filteredArr);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occured " + e });
        }
    },

    getCourseCustomersData: async (req, res) => {
        try {
            const courseItems = req.body
            const allCustomers = await Customer.find({})
            const filteredCoursesArr = [];
            for (const x in allCustomers) {
                for (const y in courseItems) {
                    if (courseItems[y] == allCustomers[x]._id) {
                        filteredCoursesArr.push(allCustomers[x]);
                    }
                }
            }
            // console.log("filteredCoursesArr: ", filteredCoursesArr);
            return serverResponse(res, 200, filteredCoursesArr);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occured " + e });
        }
    },

    // deleteAllCourses: async (req, res) => {
    //     try {
    //         const allCourses = await Course.deleteMany({});
    //         return serverResponse(res, 200, allCourses);
    //     } catch (e) {
    //         return serverResponse(res, 500, { message: "internal error occurred " + e });
    //     }
    // }
};
