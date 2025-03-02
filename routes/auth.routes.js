const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const authRouter = express.Router();
const saltRounds = 10;

authRouter.post("/signup", (req, res) => {
  const { username, email, password, name, lastname, roles, active, image } = req.body;

  if (!email || !password || !name || !lastname || !roles) {
    return res.status(400).json({ message: "Provide all required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Provide a valid email address.' });
  }

  bcrypt.hash(password, saltRounds)
    .then(hashedPassword => {
      return User.create({ username, email, password: hashedPassword, name, lastname, roles, active, image });
    })
    .then(createdUser => {
      res.status(201).json(createdUser);
    })
    .catch(err => {
      console.error("Error while creating the user", err);
      res.status(500).json({ message: "Error while creating the user" });
    });
});

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Provide username and password." });
  }

  User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        return res.status(401).json({ message: "User not found." });
      }

      bcrypt.compare(password, foundUser.password)
        .then(passwordCorrect => {
          if (passwordCorrect) {
            const payload = { _id: foundUser._id, username: foundUser.username, name: foundUser.name };
            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "6h" });
            res.status(200).json({ authToken });
          } else {
            res.status(401).json({ message: "Unable to authenticate the user" });
          }
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

authRouter.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = authRouter;
