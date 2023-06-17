const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const hasRole = await User.findById(req.user?._id);
    // check if the userrole is Admin ;
    if (!hasRole) {
      res.status(404).json({
        status: "Not found",
        message: "User doesn't exist.",
      });
      return;
    }
    if (hasRole?.role !== "admin") {
      res.status(403).json({
        status: "Forbidden",
        message: "You can't access this resource.",
      });
      return;
    }

    if (hasRole?.role == "admin") {
      return next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = isAdmin;
