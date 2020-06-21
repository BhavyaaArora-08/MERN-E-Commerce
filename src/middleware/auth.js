const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  // Verify token
  try {
    // Get token from the header
    // const token = req.header("x-auth-token");

    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));

    const user = await User.findOne({
      _id: decoded.user.id, // check is the token belongs to the user
      "tokens.token": token, // check if the token still exists
    }).select("-password");

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    if (e.message) console.error(e.message);
    res.status(401).send({ errors: [{ msg: "Please Authenticate" }] });
  }
};

module.exports = auth;
