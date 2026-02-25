const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TEMP REGISTER USER (for testing)
router.get("/register-test", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: "admin@gmail.com" });

    if (existingUser) {
      return res.json("User already exists");
    }

    const hashed = await bcrypt.hash("123456", 10);

    const user = new User({
      email: "admin@gmail.com",
      password: hashed,
      role: "admin"
    });

    await user.save();

    res.json("Test user created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, "SECRETKEY");

    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;