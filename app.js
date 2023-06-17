const express = require("express");
const authRoutes = require("./routes/auth.routes");
const { postRoutes } = require("./routes/post.routes");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { userRoutes } = require("./routes/user.routes");

app.use(morgan("dev"));
app.use(express.json());
// serve static files
app.use(express.static("uploads"));

// auth routes
app.use("/auth", authRoutes);
app.use(postRoutes);
app.use("/admin", userRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the blogger API",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: `Route not found. Please try again.`,
  });
});

module.exports = {
  app,
};
