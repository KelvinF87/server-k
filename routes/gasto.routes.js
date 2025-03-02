// routes/gasto.routes.js
const express = require("express");
const Gasto = require("../models/Gasto.model");
const { isAuthenticated, authorizeRoles } = require("../middleware/jwt.middleware");
const { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete } = require("../utils/crud"); // Import the functions

const gastoRouter = express.Router();

gastoRouter.post("/", isAuthenticated, (req, res) => handleCreate(Gasto, req, res));
gastoRouter.get("/", isAuthenticated, authorizeRoles("admin", "user"), (req, res) => handleGetAll(Gasto, req, res, "tipo"));
gastoRouter.get("/:id", isAuthenticated, (req, res) => handleGetOne(Gasto, req, res, "tipo"));
gastoRouter.put("/:id", isAuthenticated, (req, res) => handleUpdate(Gasto, req, res));
gastoRouter.delete("/:id", isAuthenticated, (req, res) => handleDelete(Gasto, req, res));

module.exports = gastoRouter;
