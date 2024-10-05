const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionUrl = process.env.MONGODB_URL;

const connection = mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Database Connection Error");
  });

module.exports = connection;
