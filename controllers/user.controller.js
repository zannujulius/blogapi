const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");

const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    let users = [];
    if (role) {
      users = await User.find({
        role: role == "admin" ? "admin" : role == "user" ? "user" : "",
      });
    } else {
      users = await User.find();
    }
    res.status(200).json({
      data: users,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

// get a particular post
const fetchOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "Not found",
        message: "A userId is required",
      });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        status: "Invalid Id",
        message: "You have passed an invalid userid",
      });
      return;
    }

    const foundUser = await User.findOne({ _id: id });

    if (!foundUser) {
      res.status(404).json({
        status: "Not found",
        message: "Post not found",
      });
      return;
    }
    res.status(200).json({
      data: foundUser,
      message: "successful",
    });
  } catch (err) {
    console.log(err.message, "//error message");
  }
};

module.exports = {
  getAllUsers,
  fetchOneUser,
};
