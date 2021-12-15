const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.loginUser = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, message) => {
    if (err) return res.status(500).json({ message: err });
    else if (user) {
      req.login(user, async (err) => {
        if (err) return res.status(500).json({ message: err });
        else {
          const token = genToken(user);
          return res.status(200).json({ result: user, token });
        }
      });
    } else return res.status(400).json({ message:err });
  })(req, res);
};
const genToken = (user) => {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, "7B2394B6D7264121F114CCA138A8A");
  return token;
};
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
exports.authorizationMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, message) => {
    if (err || !user.id) {
      if (Object.keys(message).length) return res.status(401).json({ message });
      else
        return res
          .status(401)
          .json({ message: "No user found with this token" });
    } else {
      req.user = user.id;
      return next();
    }
  })(req, res, next);}