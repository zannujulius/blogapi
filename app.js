const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res, next) => {
  res.json({
    age: 23,
    name: "julius",
  });
});

app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
