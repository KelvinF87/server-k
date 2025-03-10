// routes/user.routes.js
const express = require("express");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { handleGetAllUserAdmin, handleGetOne, handleUpdate, handleResetPassword, handleResetPasswordEmail } = require("../utils/crud");
const validateEmail = require("../middleware/emailValidation.middleware"); // Importar el middleware
const userRouter = express.Router();
userRouter.get('/', isAuthenticated, (req, res) => handleGetAllUserAdmin(User, req, res));  // GET /api/users
userRouter.get('/:id', isAuthenticated, (req, res) => handleGetOne(User, req, res));
userRouter.put('/:id', isAuthenticated, (req, res) => handleUpdate(User, req, res));
userRouter.post('/reset-password/:id', isAuthenticated, handleResetPassword);
userRouter.post('/reset-pass/:email', validateEmail, handleResetPasswordEmail); // Usar el middleware aquí
module.exports = userRouter;