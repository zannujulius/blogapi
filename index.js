const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res, next) => {
  res.json({
    name: "julius",
    age: 23,
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on " + PORT);
});
