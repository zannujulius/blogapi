const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.send("this is the index page");
});

module.exports = {
  app,
};
