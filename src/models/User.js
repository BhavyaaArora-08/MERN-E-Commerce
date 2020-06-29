const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  adminKey: {
    type: String,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// for a particular user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const JWT_SECRET = config.get("JWT_SECRET");
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "2 days" });

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

// for the entire model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new Error("Incorrect password/username field");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password/username field");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
