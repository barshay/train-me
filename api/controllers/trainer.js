const Trainer = require("../models/trainer");
const serverResponse = require("../utils/serverResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * still need to adjustment this page to
 * our requests names and functionality
 */

module.exports = {
  signup: (req, res) => {
    const { firstName, lastName, age, profilePic, gender, email, password } =
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
          firstName,
          lastName,
          age,
          profilePic,
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

  getAllTrainers: (req, res) => {
    Trainer.find().then((trainers) => {
      res.status(200).json(trainers);
    });
  },

  getTrainerById: (req, res) => {
    const trainerId = req.params.trainerID;
    Trainer.findById({ _id: trainerId }).then((trainer) => {
      res.status(200).json(trainer);
    });
  },

  updateTrainer: (req, res) => {
    const trainerId = req.params.trainerId;

    res.status(200).json({
      message: "Update Trainer - ${trainerId}",
    });
  },

  deleteTrainer: (req, res) => {
    const trainerId = req.params.trainerId;

    res.status(200).json({
      message: "Delete Trainer - ${trainerId}",
    });
  },
};
