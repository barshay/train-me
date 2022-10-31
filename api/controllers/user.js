const User = require("../models/user");
// const { allowedUpdates } = require('../../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../../cloudinary/cloudinary");

const {
    // createToken,
    hashPassword,
    // verifyPassword
} = require('./util');

module.exports = {
    signup: async (req, res) => {
        try {
            const { firstName, lastName, age, email, phoneNumber, profilePic, gender } = req.body;

            const hashedPassword = await hashPassword(
                req.body.password
            );

            let role = '';

            if (['customer', 'trainer'].includes(req.body.role)) {
                role = req.body.role;
            }

            let cloImageResult = '';
            await cloudinary.uploader.upload(profilePic,
                {
                    folder: "trainme_user_avatar",
                    upload_preset: 'unsigned_upload_user',
                    public_id: `${email}_avatar`,
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

            const userData = {
                email: email.toLowerCase(),
                firstName,
                lastName,
                age,
                phoneNumber,
                profilePic: cloImageResult.secure_url,
                gender,
                password: hashedPassword,
                role
            };

            const existingEmail = await User.findOne({
                email: userData.email
            }).lean();

            if (existingEmail) {
                return res
                    .status(400)
                    .json({ message: 'Email already exists' });
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();

                admin.save();
                console.log("Admin created");
                return serverResponse(res, 201, { cloImageResult });

        } catch (err) {
            return serverResponse(res, 500, { message: "internal error occured" + error })
        }
    },
};