const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./dbConnect/dbConnect");
const getServices = require("./utils/getServices");
const getCategory = require("./utils/getCategory");
const publicRouter = require("./route/routes");
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// connect to database
connectDB();
getServices();
getCategory();

// public routes
app.use("/api", publicRouter);
// private routes

// start server
// error middleware

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
