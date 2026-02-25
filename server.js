require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Debug check
console.log("ENV CHECK:", process.env.MONGO_URI);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("Connection Failed:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test route
app.get("/", (req, res) => {
  res.send("Hospital Backend Running...");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});