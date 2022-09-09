
const Admin = require("../models/admin");
const { productAllowedUpdates } = require('../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');

/**
 * still need to adjustment this page to 
 * our requests names and functionality
 */

const getAllProducts = async (req, res) => {
    try {
        const Admin = await Admin.find({});
        return serverResponse(res, 200, Admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
};

const getProductById = async (req, res) => {
    try {

        const productId = req.params.productId;
        const Admin = await Admin.findOne({ _id: productId });
        return serverResponse(res, 200, Admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
};

const getAllproductsByMatchingCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const Admin = await Admin.find({ category });
        return serverResponse(res, 200, Admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
};

const addProduct = async (req, res) => {
    try {
        const Admin = new Admin({ ...req.body });
        await Admin.save();
        return serverResponse(res, 200, Admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const Admin = await Admin.findOneAndDelete({ _id: productId });
        return serverResponse(res, 200, Admin);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.productId

    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
        productAllowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "Invalid updates" });
    }

    try {
        const Admin = await Admin.findOne({ _id: productId })
        if (!Admin) {
            return serverResponse(res, 404, { message: "product does not exist" });
        }
        updates.forEach((update) => (Admin[update] = req.body[update]));
        await Admin.save();
        return serverResponse(res, 200, Admin);
    } catch (err) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to update user",
        });
    }
};






module.exports = {
    // getAllProducts,
    // getProductById,
    // getAllproductsByMatchingCategory,
    // addProduct,
    // deleteProduct,
    // updateProduct
};