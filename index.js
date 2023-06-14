const http = require("http");
const { mongoConnect } = require("./services/DBconnection");
const { app } = require("./app");
const PORT = 5000;
require("dotenv").config();

async function startServer() {
  try {
    await mongoConnect();
    http.createServer({}, app).listen(process.env.PORT || PORT, () => {
      console.log(process.env.NODE_ENV);
      console.log("Server is running on port " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
