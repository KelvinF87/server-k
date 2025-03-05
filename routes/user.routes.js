
// routes/user.routes.js
const express = require("express");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { handleGetOne } = require("../utils/crud"); // Only need handleGetOne

const userRouter = express.Router();

userRouter.get('/:id', isAuthenticated, (req, res) => handleGetOne(User, req, res));

userRouter.put('/:id', isAuthenticated, (req, res) => handleUpdate(User, req, res));

module.exports = userRouter;