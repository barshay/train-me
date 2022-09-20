const Trainer = require("../models/trainer");
const serverResponse = require("../utils/serverResponse");
const { allowedUpdates } = require('../../constants/allowedUpdates');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  signup: (req, res) => {
    const { firstname, lastname, age, profilepic, phone, gender, email, password } =
      req.body;

    Trainer.find({ email }).then((trainers) => {
      if (trainers.length >= 1) {
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

        const trainer = new Trainer({
          firstname,
          lastname,
          age,
          phone,
          profilepic,
          gender,
          email,
          password: hash,
        });

        trainer
          .save()
          .then((result) => {
            console.log(result);

            res.status(200).json({
              message: "Trainer created",
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
