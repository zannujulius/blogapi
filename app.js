const express = require("express");
const authRoutes = require("./routes/auth.routes");
const { postRoutes } = require("./routes/post.routes");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev"));
app.use(express.json());
// serve static files
app.use(express.static("uploads"));

app.use("/auth", authRoutes);
app.use(postRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the blogger API",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: `${req.url}: not found. Please try again.`,
  });
});

module.exports = {
  app,
};
