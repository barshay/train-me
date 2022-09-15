const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

module.exports = {
  signup: (req, res) => {
    const { firstname, lastname, profilePic, email, password } = req.body;

    Admin.find({ email }).then((Admins) => {
      if (Admins.length >= 1) {
        return res.status(409).json({
          message: "Email exists",
        });
      }

      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error,
          });
        }

        const admin = new Admin({
          _id: new mongoose.Types.ObjectId(),
          firstname,
          lastname,
          age,
          profilePic,
          gender,
          email,
          password: hash,
        });

        admin
          .save()
          .then((result) => {
            console.log(result);

            res.status(200).json({
              message: "Admin created",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
    });
  },

  login: (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
    });
  },
};
