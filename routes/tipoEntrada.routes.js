
// routes/tipoEntrada.routes.js
const express = require("express");
const TipoEntrada = require("../models/TipoEntrada.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { handleCreate, handleGetAll, handleGetOne, handleUpdate, handleDelete } = require("../utils/crud");

const tipoEntradaRouter = express.Router();

tipoEntradaRouter.post("/", isAuthenticated, (req, res) => handleCreate(TipoEntrada, req, res));
tipoEntradaRouter.get("/", isAuthenticated, (req, res) => handleGetAll(TipoEntrada, req, res));
tipoEntradaRouter.get("/:id", isAuthenticated, (req, res) => handleGetOne(TipoEntrada, req, res));
tipoEntradaRouter.put("/:id", isAuthenticated, (req, res) => handleUpdate(TipoEntrada, req, res));
tipoEntradaRouter.delete("/:id", isAuthenticated, (req, res) => handleDelete(TipoEntrada, req, res));

module.exports = tipoEntradaRouter;
