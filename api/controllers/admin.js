const Admin = require("../models/admin");
const { allowedUpdates } = require('../../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = {
  signup: async (req, res) => {
    const { firstname, lastname, profilepic, email, password } = req.body;

      const allAdmin = await Admin.find({});
      if (allAdmin.length > 0) {
        console.log('admin is: error ');
        return res.status(422).json({ error: "There is Admin already!" });
      };
   



    //  Admin.find({ email }).then((Admins) => {
    //   if (Admins.length >= 1) {
    //     return res.status(409).json({
    //       message: "There is Admin already!",
    //     });
    //   }

      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error,
          });
        }

        const admin = new Admin({
          firstname,
          lastname,
          profilepic,
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
    },
  

  login: (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
    });
  },

  getAdmin: async (req, res) => {
    try {
      const allAdmin = await Admin.find({});
      return serverResponse(res, 200, allAdmin);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

};
