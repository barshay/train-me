const Course = require("../models/course");
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
            console.log(updates)
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
            return serverResponse(res, 200, courseProduct);
        } catch (err) {
            return serverResponse(res, 500, {
                message: "Internal error while trying to update course",
            });
        }
    },

    /**  
        how to get the trainer id from front via params 
        to fetch only the courses belonging to that trainer 
     */
    getAllCourses: async (req, res) => {
        try {
            const allCourses = await Course.find({})
            // let filteredCoursesByTrainerId = {};
            // for (const i in allCourses) {
            //     if (allCourses[i].trainer === trainerId) {
            //         // console.log(trainerId);
            //         filteredCoursesByTrainerId[i] = allCourses[i]
            //     }
            // }
            // console.log(filteredCoursesByTrainerId);
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
            const courseProduct = await Course.findById(req.params.courseId);
            // console.log("Course Product", courseProduct.picture.public_id)
            const imgId = courseProduct.picture.public_id;
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }

            const course = await Course.findOneAndDelete({ _id: courseProduct });
            return serverResponse(res, 200, course);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occurred " + e });
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
