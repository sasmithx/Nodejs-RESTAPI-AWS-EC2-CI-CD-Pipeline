/*
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/db");
const errorHandler = require("./middlewares/errorhandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//connect to the database
connectDB();

//routes
app.use("/api/users", userRoutes);

app.use("/api/products", (req, res) => {
  return res.status(200).json({
    message: "This is new feature change, a new route for products Sasmith",
  });
});

//error handler
app.use(errorHandler);

//listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/db");
const errorHandler = require("./middlewares/errorhandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes); // User-related routes

// Product route (GET request)
app.get("/api/products", (req, res) => {
  return res.status(200).json({
    message: "This is a new feature change, a new route for products Sasmith",
  });
});

// Error handler middleware (last in the middleware stack)
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
