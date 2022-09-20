const Customer = require("../models/customer");
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
          firstName,
          lastName,
          age,
          profilePic,
          gender,
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

  getAllCustomers: (req, res) => {
    Customer.find().then((customers) => {
      res.status(200).json(customers);
    });
  },

  getCustomerById: (req, res) => {
    const customerId = req.params.customerID;
    Customer.findById({ _id: customerId }).then((customer) => {
      res.status(200).json(customer);
    });
  },

  updateCustomer: (req, res) => {
    const customerId = req.params.customerId;

    res.status(200).json({
      message: "Update Customer - ${customerId}",
    });
  },

  deleteCustomer: (req, res) => {
    const customerId = req.params.customerId;

    res.status(200).json({
      message: "Delete Customer - ${customerId}",
    });
  },
};
