const Trainer = require("../models/trainer");
const { allowedUpdates } = require('../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');


const getAllTrainers = async (req, res) => {
    try {
        const allTrainer = await Trainer.find({});
        return serverResponse(res, 200, allTrainer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

// How to get the default parameters on rating
const addNewTrainer = async (req, res) => {
    try {
        const trainer = new Trainer({ ...req.body });
        await trainer.save();
        console.log(trainer);
        return serverResponse(res, 200, trainer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const getTrainerById = async (req, res) => {
    try {
        const trainerId = req.params.trainerID;
        const trainer = await Trainer.findOne({ _id: trainerId });
        return serverResponse(res, 200, trainer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const deleteTrainerById = async (req, res) => {
    try {
        const trainerId = req.params.trainerID;
        const trainer = await Trainer.findOneAndDelete({ _id: trainerId });
        return serverResponse(res, 200, trainer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};



module.exports = {
    getAllTrainers,
    addNewTrainer,
    getTrainerById,
    deleteTrainerById,

};