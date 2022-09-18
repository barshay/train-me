
const Admin = require("../models/admin");
const { allowedUpdates } = require('../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');


const addNewPostOfAdmin = async (req, res) => {
    try {
        const allAdmin = await Admin.find({});
        if (allAdmin.length > 0 ) {
            console.log('admin is: error ' );
            return res.status(422).json({ error: "There is Admin already!" });
            // return serverResponse(res, 500, { message: "internal error occured " + e });
        }
        console.log(allAdmin);
        const newPostOfAdmin = new Admin({ ...req.body });
        await newPostOfAdmin.save();
        return serverResponse(res, 200, newPostOfAdmin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

// const getAdminById = async (req, res) => {
//     try {
//         console.log(req.params);
//         const adminId = req.params.adminID;
//         const admin = await Admin.findOne({ _id: adminId });
//         return serverResponse(res, 200, admin);
//     } catch (e) {
//         return serverResponse(res, 500, { message: "internal error occured " + e });
//     }
// };

const deleteAdminById = async (req, res) => {
    try {
        console.log(req.params);
        const adminId = req.params.adminID;
        const admin = await Admin.findOneAndDelete({ _id: adminId });
        return serverResponse(res, 200, admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const getAdmin = async (req, res) => {
    try {
        const allAdmin = await Admin.find({});
        return serverResponse(res, 200, allAdmin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};


module.exports = {
    addNewPostOfAdmin,
    // getAdminById,
    deleteAdminById,
    getAdmin
};