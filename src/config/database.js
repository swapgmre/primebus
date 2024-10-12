const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb+srv://swapgmre:AXASummerWinter%2317%2A@cluster0.jpffv.mongodb.net/prime_bus")
};

module.exports = connectDB;
