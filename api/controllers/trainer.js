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

    const allTrainer = await Trainer.find({});
    for (const i in allTrainer) {
      if (allTrainer[i].email === email) {
        return res.status(422).json({ error: "This Email is already taken!" });
      }
    }

    let cloImageResult = '';
    await cloudinary.uploader.upload(profilepic,
      {
        folder: "trainme_trainers_avatar",
        upload_preset: 'unsigned_upload_trainer',
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
  },

  login: async (req, res) => {
    const { email, password } = req.body
    console.log('password: ', password);
    try {
      await Trainer.findOne({ email })
        .then(savedPassword => {
          if (!savedPassword) {
            return res.status(422).json({ error: "Invalid email or password" })
          }
          bcrypt.compare(password, savedPassword.password)
            .then(doMatch => {
              if (doMatch) {
                // res.json({message:"SignIn successfull"})
                // const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                // const { _id, name, email, role } = savedUser
                // res.json({ token, user: { _id, email, name, role } })
                return res.status(200).json({
                  message: "Welcome Trainer",
                });
              } else {
                return res.status(422).json({ error: "Invalid Email or Password" })
              }
            }).catch(err => {
              console.log(err);
            })
        }).
        catch(err => {
          console.log(err);
        })

    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  getAllTrainers: async (req, res) => {
    try {
      const allTrainers = await Trainer.find({});
      return serverResponse(res, 200, allTrainers);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  getTrainerById: async (req, res) => {
    try {
      const trainerID = req.params.trainerId;
      const trainer = await Trainer.findOne({ _id: trainerID });
      return serverResponse(res, 200, trainer);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  deleteTrainerById: async (req, res) => {
    try {
      const trainerID = req.params.trainerId;
      const trainer = await Trainer.findOneAndDelete({ _id: trainerID });
      return serverResponse(res, 200, trainer);
    } catch (e) {
      return serverResponse(res, 500, { message: "internal error occured " + e });
    }
  },

  // TODO?
  updateTrainer: (req, res) => {
    const trainerID = req.params.trainerId;

    res.status(200).json({
      message: "Update Trainer - ${trainerId}",
    });
  },

};
