const Customer = require("../models/customer");
const { allowedUpdates } = require('../../constants/allowedUpdates');
const serverResponse = require('../utils/serverResponse');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: (req, res) => {
    const { firstname, lastname, age, profilepic, gender, phone, email, password } =
      req.body;

    Customer.find({ email }).then((customers) => {
      if (customers.length >= 1) {
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

        const customer = new Customer({
          firstname,
          lastname,
          age,
          profilepic,
          gender,
          phone,
          email,
          password: hash,
        });

        customer
          .save()
          .then((result) => {
            console.log(result);

            res.status(200).json({
              message: "Customer created",
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
      message: "Welcome Customer",
    });
  },

  
  getAllCustomers: async (req, res) => {
        try {
            const allCustomer = await Customer.find({});
            return serverResponse(res, 200, allCustomer);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occured " + e });
        }
    },

    getCustomerById: async (req, res) => {
        try {
            const customerId = req.params.customerID;
            const customer = await Customer.findOne({ _id: customerId });
            return serverResponse(res, 200, customer);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occured " + e });
        }
    },

    deleteCustomerById: async (req, res) => {
        try {
            const customerId = req.params.customerID;
            const customer = await Customer.findOneAndDelete({ _id: customerId });
            return serverResponse(res, 200, customer);
        } catch (e) {
            return serverResponse(res, 500, { message: "internal error occured " + e });
        }
    },

    // TODO?
    updateCustomer: (req, res) => {
        const customerId = req.params.customerId;

        res.status(200).json({
            message: "Update Customer - ${customerId}",
        });
    },

};
