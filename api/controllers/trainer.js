const Trainer = require("../models/trainer");
const serverResponse = require("../utils/serverResponse");
const { allowedUpdates } = require('../../constants/allowedUpdates');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../cloudinary/cloudinary");


module.exports = {
  signup: async (req, res) => {
    const { firstname, lastname, age, profilepic, phone, gender, email, password } =
      req.body;

    let cloImageResult = '';
    await cloudinary.uploader.upload(profilepic,
      {
        folder: "trainme_trainers_avatar",
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

        const trainer = new Trainer({
          firstname,
          lastname,
          age,
          phone,
          profilepic: cloImageResult.secure_url,
          gender,
          email,
          password: hash,
        });
      // console.log("trainer is: " + trainer);

        try {
          trainer.save();
          console.log("Trainer created");
          return serverResponse(res, 200, { cloImageResult });
        } catch (error) {
          return serverResponse(res, 500, { message: "internal error occured" + error })
        }
      });

        // trainer
        //   .save()
        //   .then((result) => {
        //     console.log(result);

        //     res.status(200).json({
        //       message: "Trainer created",
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(500).json({
        //       error,
        //     });
        //   });
  },

  login: (req, res) => {
    //TODO: Add implementation for this function
    res.status(200).json({
      message: "Welcome Trainer",
    });
  },

  getAllTrainers: async (req, res) => {
    try {
      const allTrainer = await Trainer.find({});
      return serverResponse(res, 200, allTrainer);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  getTrainerById: async (req, res) => {
    try {
      const trainerId = req.params.trainerID;
      const trainer = await Trainer.findOne({ _id: trainerId });
      return serverResponse(res, 200, trainer);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  deleteTrainerById: async (req, res) => {
    try {
      const trainerId = req.params.trainerID;
      const trainer = await Trainer.findOneAndDelete({ _id: trainerId });
      return serverResponse(res, 200, trainer);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  // TODO?
  updateTrainer: (req, res) => {
    const trainerId = req.params.trainerId;

    res.status(200).json({
      message: "Update Trainer - ${trainerId}",
    });
  },

};
