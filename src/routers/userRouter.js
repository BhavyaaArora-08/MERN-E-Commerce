const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const multer = require("multer");
const sharp = require("sharp");
const authAdmin = require("../middleware/authAdmin");
const config = require("config");

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
      "password1",
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
      if (user) {
        return res
          .status(500)
          .send({ errors: [{ msg: "User already exists" }] });
      }

      if (password1 != password2) {
        return res
          .status(500)
          .send({ errors: [{ msg: "Passwords don't match" }] });
      }

      // Register means creating/ feeding the user into the db and also returning a token
      const newUser = await new User({ name, email, password: password1 });
      const token = await newUser.generateAuthToken();

      sendWelcomeEmail(newUser.email, newUser.name);
      await newUser.save();

      // Send msg to client
      res.status(201).send({ user: newUser, token });
    } catch (e) {
      console.log(e);
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

// @route   POST api/users/admin
// @desc    Create an admin
// @access  Public
router.post(
  "/admin",
  [
    // add custom validations in middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password1",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "password2",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      if (
        !req.body.ADMIN_KEY ||
        req.body.ADMIN_KEY !== config.get("ADMIN_SECRET_KEY")
      ) {
        return res.status(500).send({ errors: [{ msg: "Access Denied!" }] });
      }

      const { name, email, password1, password2 } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(500)
          .send({ errors: [{ msg: "User already exists" }] });
      }

      if (password1 != password2) {
        return res
          .status(500)
          .send({ errors: [{ msg: "Passwords don't match" }] });
      }

      // Register means creating/ feeding the user into the db and also returning a token
      const newUser = await new User({
        ...req.body,
        password: password1,
        isAdmin: true,
      });

      const token = await newUser.generateAuthToken();

      sendWelcomeEmail(newUser.email, newUser.name);
      await newUser.save();

      // Send msg to client
      res
        .status(201)
        .send({ msg: "You are now an admin!", user: newUser, token });
    } catch (e) {
      res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
  }
);

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

// @route   POST api/users/me/avatar
// @desc    Add profile photo/ avatar
// @access  Private

router.post(
  "/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send({ msg: "Profile photo added successfully!!" });
  },
  (error, req, res, next) => {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
);

// @route   GET api/users/me
// @desc    Get the user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (e) {
    res.status(401).send({ errors: [{ msg: "Please Authenticate" }] });
  }
});

// @route   GET api/users/avatar/me
// @desc    View your own profile photo/ avatar
// @access  Private
router.get("/avatar/me", auth, async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(req.user.avatar);
  } catch (e) {
    res.status(404).send({ errors: [{ msg: "No profile photo found" }] });
  }
});

// @route   GET api/users/:id/avatar
// @desc    View a profile photo/ avatar
// @access  Private
router.get("/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// @route   DELETE api/users/me
// @desc    Delete yourself
// @access  Private

router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send({ user: req.user });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   DELETE api/users/me/avatar
// @desc    Remove profile photo/ avatar
// @access  Private

router.delete("/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

module.exports = router;
