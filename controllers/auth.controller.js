const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const postLogin = async (req, res, next) => {
  // take input from the user
  const { email, password } = req.body;
  // validate input from the user
  if (!email) {
    res.status(400).json({
      status: 400,
      message: "Please provide your email address.",
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: 400,
      message: "Please provide your password.",
    });
    return;
  }

  // check if the user already exist if exist in the database
  const existingUser = await User.find({
    email: email,
  });

  if (!existingUser.length) {
    return res.status(400).json({
      status: 400,
      message: "User already exist please try again",
    });
  }

  // hash the user password

  res.send("this is the login route");
};

const postSignUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // validate the firstname field
  if (!firstName) {
    res.status(400).json({
      status: 400,
      message: "Please provide your first name.",
    });
    return;
  }
  // validate the lastname field
  if (!lastName) {
    res.status(400).json({
      status: 400,
      message: "Please provide your last name.",
    });
    return;
  }

  // validate the email field
  if (!email) {
    res.status(400).json({
      status: 400,
      message: "Please provide your email.",
    });
    return;
  }

  // validate the email field
  if (!password) {
    res.status(400).json({
      status: 400,
      message: "Please provide your password.",
    });
    return;
  }

  const existingUser = await User.find({
    email: email,
  });

  if (!existingUser) {
    console.log(existingUser, "...this is the exsiting user");
    return res.status(400).json({
      status: 400,
      message: "User already exist please try again",
    });
  }

  const encyrptedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: encyrptedPassword,
  });
  // save the user to the database
  res.status(200).json({
    status: 200,
    message: "Profile created successfully",
  });
};

module.exports = {
  postLogin,
  postSignUp,
};
