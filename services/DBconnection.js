const mongoose = require("mongoose");
require("dotenv").config();

// const DBString = `mongodb+srv://zannujulius14:${process.env.DB_PASSWORD}@cluster0.vflk9gz.mongodb.net/`;
const DBString = "mongodb://localhost:27017/bloggerDB";
const MONGO_URL = mongoose.connect(DBString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready");
});

mongoose.connection.on("error", (error) => {
  console.error("An error occured on the db", error);
});

async function mongoConnect() {
  await MONGO_URL;
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
