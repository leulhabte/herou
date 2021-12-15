const express = require("express");

const User = require("../../Models/User");

const adminController = require("../../Controllers/admin/authController");

const router = express.Router();
router.route("/signup").post(adminController.signup);
router.route("/signin").post(adminController.signin);

module.exports = router;
