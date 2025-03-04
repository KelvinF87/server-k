const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const authRouter = express.Router();
const saltRounds = 10;

authRouter.post("/signup", async (req, res) => { // Use async/await
  const { username, email, password, name, lastname, roles, active, image } = req.body;

  if (!email || !password || !name || !lastname || !roles) {
    return res.status(400).json({ message: "Provide all required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Provide a valid email address.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Await the hash
    const createdUser = await User.create({ username, email, password: hashedPassword, name, lastname, roles, active, image });
    res.status(201).json(createdUser);
  } catch (err) {
    console.error("Error while creating the user", err);
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Error while creating the user" });
  }
});

authRouter.post('/login', async (req, res) => {  // Use async/await
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Provide username and password." });
  }

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    if (passwordCorrect) {
      const payload = { _id: foundUser._id, username: foundUser.username, lastname: foundUser.lastname,email: foundUser.email, name: foundUser.name, roles: foundUser.roles }; // Include roles in payload
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "6h" });
      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (err) {
    console.error("Login Error:", err);  // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = authRouter;