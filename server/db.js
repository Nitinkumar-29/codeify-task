const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectToMongo;
