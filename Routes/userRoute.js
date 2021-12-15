const express = require("express");

const User = require("../models/User");
const jwt = require("jsonwebtoken"); // to generate token
const bcrypt = require("bcryptjs"); // encrypt password
const { check, validationResult } = require("express-validator");
//const gravatar = require('gravatar');
const userController = require("../Controllers/userController");
const orderController = require("../Controllers/ordersController")
const authController = require("../Controllers/authController")
const router = express.Router();


//get a singel logedin userc
//router.route('/:id').get( userController.getuser)

//get all users
// router.route("/signin").post(userController.loginUser);
router.route("/signup").post(userController.signup);
router.use(authController.authorizationMiddleware)
router.route("/allusers").get(userController.getusers);
router.route('/myOrders').get(orderController.getOrderForUser)
router.route('/getAddress').get(userController.getAddress)

router.patch("/updateAddress", userController.updateMe);

module.exports = router;
