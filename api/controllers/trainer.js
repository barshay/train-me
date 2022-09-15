const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Trainer = require("../models/trainer");

module.exports = {
  signup: (req, res) => {
    const { firstname, lastname, age, profilePic, gender, email, password } =
      req.body;

    Trainer.find({ email }).then((Trainers) => {
      if (Trainers.length >= 1) {
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
    res.status(200).json({
      message: "Welcome Trainer",
    });
  },

  getAllTrainers: (req, res) => {
    res.status(200).json({
      message: "Get All Trainers",
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
