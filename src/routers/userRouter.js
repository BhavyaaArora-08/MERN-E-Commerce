const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../../middleware/auth");

// Route   POST api/users
// @desc   Register a user
// @access Public
router.post(
  "/",
  [
    // add custom validations in middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const { name, email, password1, password2 } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(500).send({ errors: [{ msg: "User already exists" }] });
      }

      if (password1 != password2) {
        res.status(500).send({ errors: [{ msg: "Passwords don't match" }] });
      }

      // Register means creating/ feeding the user into the db and also returning a token
      const newUser = await new User(req.body);
      const token = await newUser.generateAuthToken();

      await newUser.save();

      // Send msg to client
      res.status(201).send({ user: newUser, token });
    } catch (e) {
      res.status(500).send({ errors: [{ msg: "Unable to Register" }] });
    }
  }
);

// Route   POST api/users/login
// @desc   Login a user
// @access Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User doesn't exist" }] });
      }

      const token = await user.generateAuthToken();
      res
        .status(200)
        .json({ msg: "User logged in successfully!", user, token });
    } catch (e) {
      res
        .status(500)
        .send({ errors: [{ msg: "Incorrect username/password field" }] });
    }
  }
);

// @route   GET api/users
// @desc    Get yourself
// @access  Private
router.get("/", auth, (req, res) => {
  res.send(req.user);
});

// @route   POST api/users/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();
    res.json({ msg: "User logged out successfully!" });
  } catch (e) {
    res.status(500).send({ error: e || "Server error" });
  }
});
module.exports = router;
