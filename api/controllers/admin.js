const Admin = require("../models/admin");
const { allowedUpdates } = require('../../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../../cloudinary/cloudinary");



module.exports = {
  signup: async (req, res) => {
    const { firstname, lastname, profilepic, email, password } = req.body;
    const allAdmin = await Admin.find({});
    if (allAdmin.length > 0) {
      console.log('admin is: error ');
      return res.status(422).json({ error: "There is Admin already!" });
    };

    let cloImageResult = '';
    await cloudinary.uploader.upload(profilepic,
      {
        folder: "trainme_admin_avatar",
        upload_preset: 'unsigned_upload',
        public_id: `${firstname}_${lastname}_avatar`,
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

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({
          error,
        });
      }

      const admin = new Admin({
        firstname: firstname,
        lastname: lastname,
        profilepic: cloImageResult.secure_url,
        email: email,
        password: hash,
      });
      // console.log("admin is: " + admin);

      try {
        admin.save();
        console.log("Admin created");
        return serverResponse(res, 200, { cloImageResult });
      } catch (error) {
        return serverResponse(res, 500, { message: "internal error occured" + error })
      }
      // admin
      //   .save()
      //   .then((res) => {
      //     console.log("result:  " + res);
      //     res.status(200).json({
      //       // resultUrl: resultUrl,
      //       message: "Admin created",
      //     });
      //   })
      //   .catch((error) => {
      //     res.status(500).json({
      //       error,
      //     });
      //   });
    });

  },


  login: (req, res) => {
    //TODO 
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

  // uploadAdminImage: async (req, res) => {
  //   console.log("from Admin controller, 92: ", req.body);
  //   const { image } = req.body;

  //   const uploadedImage = await cloudinary.uploader.upload(image,
  //     {
  //       upload_preset: 'unsigned_upload',
  //       public_id: /** `${firstname, lastname}avatar` */`avatar`,
  //       allowed_formats: ['jpeg, jpg, png, svg, ico, jfif, webp']
  //     },
  //     function (error, result) {
  //       if (error) {
  //         console.log(error);
  //       }
  //       console.log('check', result);
  //     }
  //   );

  //   try {
  //     res.status(200).json(uploadedImage);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

};
