const express = require("express");
const TipoEntrada = require("../models/TipoEntrada.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const tipoEntradaRouter = express.Router();

// Create a new TipoEntrada
tipoEntradaRouter.post("/", isAuthenticated, (req, res) => {
  TipoEntrada.create(req.body)
    .then(newTipoEntrada => {
      res.status(201).json(newTipoEntrada);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating TipoEntrada", error: err.message });
    });
});

// Get all TipoEntradas
tipoEntradaRouter.get("/", isAuthenticated, (req, res) => {
  TipoEntrada.find()
    .then(tipoEntradas => {
      res.status(200).json(tipoEntradas);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving TipoEntradas", error: err.message });
    });
});

// Get a single TipoEntrada by ID
tipoEntradaRouter.get("/:id", isAuthenticated, (req, res) => {
  TipoEntrada.findById(req.params.id)
    .then(tipoEntrada => {
      if (!tipoEntrada) return res.status(404).json({ message: "TipoEntrada not found" });
      res.status(200).json(tipoEntrada);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving TipoEntrada", error: err.message });
    });
});

// Update a TipoEntrada by ID
tipoEntradaRouter.put("/:id", isAuthenticated, (req, res) => {
  TipoEntrada.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTipoEntrada => {
      if (!updatedTipoEntrada) return res.status(404).json({ message: "TipoEntrada not found" });
      res.status(200).json(updatedTipoEntrada);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating TipoEntrada", error: err.message });
    });
});

// Delete a TipoEntrada by ID
tipoEntradaRouter.delete("/:id", isAuthenticated, (req, res) => {
  TipoEntrada.findByIdAndDelete(req.params.id)
    .then(deletedTipoEntrada => {
      if (!deletedTipoEntrada) return res.status(404).json({ message: "TipoEntrada not found" });
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting TipoEntrada", error: err.message });
    });
});

module.exports = tipoEntradaRouter;
