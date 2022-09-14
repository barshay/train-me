const Customer = require("../models/customer");
const { allowedUpdates } = require('../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');


/**
 * still need to adjustment this page to 
 * our requests names and functionality
 */

const getAllCustomers = async (req, res) => {
    try {
        const allCustomer = await Customer.find({});
        return serverResponse(res, 200, allCustomer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const addNewCustomer = async (req, res) => {
    try {
        const customer = new Customer({ ...req.body });
        await customer.save();
        return serverResponse(res, 200, customer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.customerID;
        const customer = await Customer.findOne({ _id: customerId });
        return serverResponse(res, 200, customer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerID;
        const customer = await Customer.findOneAndDelete({ _id: customerId });
        return serverResponse(res, 200, customer);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured " + e });
    }
};



module.exports = {
    addNewCustomer,
    getAllCustomers,
    deleteCustomer,
    getCustomerById,

};