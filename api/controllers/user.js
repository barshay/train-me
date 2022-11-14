const User = require("../models/user");
// const { allowedUpdates } = require('../../constants/allowedUpdates');
const serverResponse = require("../utils/serverResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../../cloudinary/cloudinary");

const { createToken, hashPassword, verifyPassword } = require("../utils/utils");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).lean();

      if (!user) {
        return res.status(403).json({
          message: "Wrong email or password.",
        });
      }

      const passwordValid = await verifyPassword(password, user.password);

      if (passwordValid) {
        const { password, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = createToken(userInfo);

        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.json({
          message: "Authentication successful!",
          token,
          userInfo,
          expiresAt,
        });
      } else {
        res.status(403).json({
          message: "Wrong email or password.",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem to login to your account",
      });
    }
  },
  signup: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        age,
        email,
        phoneNumber,
        profilePic,
        gender,
      } = req.body;
      const hashedPassword = await hashPassword(req.body.password);

      let role = "";

      if (["customer", "trainer"].includes(req.body.role)) {
        role = req.body.role;
      }

      let cloImageResult = "";
      //   await cloudinary.uploader.upload(
      //     profilePic,
      //     {
      //       folder: "trainme_user_avatar",
      //       upload_preset: "unsigned_upload_user",
      //       public_id: `${email}_avatar`,
      //       allowed_formats: ["jpeg, jpg, png, svg, ico, jfif, webp"],
      //     },
      //     function (error, result) {
      //       if (error) {
      //         console.log("error from cloudinary");
      //         console.log(error);
      //       } else {
      //         cloImageResult = result;
      //         // console.log("result.public_id : " + result.public_id)
      //         console.log("No Error from cloudinary");
      //       }
      //     }
      //   );

      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        age,
        phoneNumber,
        profilePic: cloImageResult.secure_url,
        gender,
        password: hashedPassword,
        role,
      };

      const existingEmail = await User.findOne({
        email: userData.email,
      }).lean();

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new User(userData);
      const savedUser = await newUser.save();
      console.log("test");
      if (savedUser) {
        const token = createToken(savedUser);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        const {
          firstName,
          lastName,
          email,
          role,
          age,
          phoneNumber,
          profilePic,
          gender,
        } = savedUser;

        const userInfo = {
          firstName,
          lastName,
          email,
          role,
          age,
          phoneNumber,
          profilePic,
          gender,
        };

        return res.status(200).json({
          message: "User created!",
          token,
          userInfo,
          expiresAt,
        });
      } else {
        console.log("else");
        return res.status(400).json({
          message: "There was a problem creating your account",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  },
};
