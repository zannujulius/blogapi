const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the blogger API",
  });
});

module.exports = {
  app,
};
