const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const { getAllUsers, fetchOneUser } = require("../controllers/user.controller");
const router = express.Router();

// admin fetch all user
router.get("/users", verifyToken, isAdmin, getAllUsers);

// admin fetch one user
router.get("/user/:id", verifyToken, isAdmin, fetchOneUser);

module.exports = { userRoutes: router };
