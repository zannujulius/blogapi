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
  res.json({
    message: "Welcome to the blogger API",
  });
});

module.exports = {
  app,
};
