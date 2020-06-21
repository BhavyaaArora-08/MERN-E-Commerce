const config = require("config");

const authAdmin = async (req, res, next) => {
  // This user has already undergone ordinary authentication
  // now we will check its role
  try {
    if (req.admin_key !== config.get("ADMIN_SECRET_KEY")) {
      throw new Error();
    }

    next();
  } catch (e) {
    if (e.message) console.error(e.message);
    res
      .status(401)
      .send({
        errors: [
          {
            msg: "Access Denied !! Hackiing alert set. You are being watched.",
          },
        ],
      });
  }
};
