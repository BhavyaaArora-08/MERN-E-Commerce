const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const multer = require("multer");
const sharp = require("sharp");
const Product = require("../models/Product");
const { check, validationResult } = require("express-validator");

// Everything should be accessible to the admin

// Route   GET api/products
// @desc   Get all products
// @access Public

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// Route   POST api/products
// @desc   Create a product
// @access Private (only Admin)

router.post(
  "/",
  [
    auth,
    authAdmin,
    // add custom validations in middleware
    check("name", "Name is required").not().isEmpty(),
    check("price", "Please include a valid email").isInt(),
    check("category", "category is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      let product = await Product.findOne({
        name: req.body.name,
      });

      if (product) {
        return res.status(409).json({ msg: "Product already exists!" });
      }

      product = await new Product({ ...req.body });
      await product.save();

      res.json({ msg: "Product added successfully", product });
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
  "/:id/avatar",
  [auth, authAdmin],
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }
    try {
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          avatar: buffer,
        },
        { useFindAndModify: false }
      );

      res.send({ msg: "Profile photo added successfully!!" });
    } catch (e) {
      res.status(500).send({ errors: [{ msg: "Server Error", error: e }] });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ errors: [{ msg: error.message }] });
  }
);

// Route   DELETE api/products
// @desc   Delete all products
// @access Private (only Admin)

router.delete("/", [auth, authAdmin], async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    res.json({ msg: "All Products deleted successfully! Shop is now empty" });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// Route   GET api/products/:id
// @desc   Get a particular product
// @access Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }
    res.json({ product });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// @route   GET api/products/:id/avatar
// @desc    View a profile photo/ avatar
// @access  Public
router.get("/:id/avatar", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(product.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// Route   PUT api/products/:id
// @desc   Update a product
// @access Private (only Admin)

router.put("/:id", [auth, authAdmin], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }
    await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { useFindAndModif: false }
    );
    res.json({ product });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

// Route   DELETE api/products/:id
// @desc   Delete a particular product
// @access Private (only Admin)

router.delete("/:id", [auth, authAdmin], async (req, res) => {
  try {
    const products = await Product.deleteOne({ _id: req.params.id });
    res.json({ msg: "Product deleted successfully!" });
  } catch (e) {
    res.status(500).send({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
// Filtering done at the client side
