
// routes/ingreso.routes.js
const express = require("express");
const Ingreso = require("../models/Ingreso.model");
const { isAuthenticated, authorizeRoles } = require("../middleware/jwt.middleware");
const { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete } = require("../utils/crud");

const ingresoRouter = express.Router();

ingresoRouter.post("/", isAuthenticated, (req, res) => handleCreate(Ingreso, req, res));
// ingresoRouter.get("/", isAuthenticated, authorizeRoles("admin", "user"), (req, res) => handleGetAll(Ingreso, req, res, "tipo"));
ingresoRouter.get("/", isAuthenticated, authorizeRoles("admin","user"), (req, res) => handleGetAll(Ingreso, req, res, "tipo"));
ingresoRouter.get("/:id", isAuthenticated, (req, res) => handleGetOne(Ingreso, req, res, "tipo"));
ingresoRouter.put("/:id", isAuthenticated, (req, res) => handleUpdate(Ingreso, req, res));
ingresoRouter.delete("/:id", isAuthenticated, (req, res) => handleDelete(Ingreso, req, res));

module.exports = ingresoRouter;
