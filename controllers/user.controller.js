const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// get all users
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

// user edit user
const userEditProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const foundUser = await User.findById(id);
    if (!foundUser) {
      res.status(400).json({
        status: "Not found",
        message: `Post with user-${id} was not found.`,
      });
      return;
    }

    const { firstName, lastName } = req.body;

    if (!(firstName && lastName)) {
      res.status(400).json({
        status: "Empty",
        message: "Please pass valid values for first name and last name",
      });
      return;
    }

    const newUserDetails = {
      firstName: firstName,
      lastName: lastName,
    };

    await User.findOneAndUpdate({ _id: id }, newUserDetails, {
      new: true,
    });
    res.status(200).json({
      status: "Updated",
      message: "Profile update successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

// user change password
const changePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json({
        status: "Values Required",
        message: `Both values are required.`,
      });
      return;
    }
    const foundUser = await User.findById(id);
    if (!foundUser) {
      res.status(400).json({
        status: "Not found",
        message: `Post with user-${id} was not found.`,
      });
      return;
    }

    const decryptPassword = await bcrypt.compare(
      oldPassword,
      foundUser?.password
    );

    if (!decryptPassword) {
      res.status(400).json({
        status: "Incorrect password",
        message: `Your old password is incorrect.`,
      });
      return;
    }

    const encyrptedPassword = await bcrypt.hash(newPassword, 8);
    await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        password: encyrptedPassword,
      },
      { new: true }
    );

    res.status(200).json({
      status: "Updated",
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUsers,
  fetchOneUser,
  userEditProfile,
  changePassword,
};
