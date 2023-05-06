const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
