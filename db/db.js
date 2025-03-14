/*
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const uri = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
*/

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

mongoose.set("strictQuery", false);

const uri = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,      // Helps handle connection string changes
      useUnifiedTopology: true,   // Enables new MongoDB engine
    });

    console.log("✅ MongoDB connection established");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
