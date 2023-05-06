const express = require("express");
const { postLogin, postSignUp } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", postLogin);

router.post("/signup", postSignUp);

module.exports = router;
