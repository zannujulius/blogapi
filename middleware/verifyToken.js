const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    if (!(req.headers.authorization && req.headers.authorization.split(" "))) {
      return res.status(401).send({
        statusMessage: "Unauthorized",
        message: "You are not authorized.",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        statusMessage: "Unauthorized",
        message: "You are not authorized.",
      });
    }

    const data = await jwt.verify(token, process.env.TOKEN_KEY_1);
    if (!data)
      return res.status(403).json({
        statusMessage: "Forbidden",
        message: "Invalid token",
      });

    const user = await User.findById({ _id: data._id });
    req.user = user;
    next();
  } catch (err) {
    if (err.message == "jwt expired") {
      return res.status(400).json({
        message: "error",
        data: "Invalid session",
      });
    }
  }
};

module.exports = { verifyToken };
