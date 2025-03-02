const express = require("express");
const Gasto = require("../models/Gasto.model");
const { isAuthenticated, authorizeRoles } = require("../middleware/jwt.middleware");

const gastoRouter = express.Router();

// Create a new Gasto
gastoRouter.post("/", isAuthenticated, (req, res) => {
    const newGastoData = { ...req.body, user: req.payload._id };
    Gasto.create(newGastoData)
      .then(newGasto => {
        res.status(201).json(newGasto);
      })
      .catch(err => {
        res.status(500).json({ message: "Error creating Gasto", error: err.message });
      });
  });

// Get all Gastos for a user or admin
gastoRouter.get("/", isAuthenticated, authorizeRoles("admin", "user"), (req, res) => {
  if (req.payload.roles.includes("admin")) {
    Gasto.find().populate("tipo")
      .then(gastos => {
        res.status(200).json(gastos);
      })
      .catch(err => {
        res.status(500).json({ message: "Error retrieving Gastos", error: err.message });
      });
  } else {
    Gasto.find({ user: req.payload._id }).populate("tipo")
      .then(gastos => {
        res.status(200).json(gastos);
      })
      .catch(err => {
        res.status(500).json({ message: "Error retrieving Gastos", error: err.message });
      });
  }
});

// Get a single Gasto by ID
gastoRouter.get("/:id", isAuthenticated, (req, res) => {
  Gasto.findById(req.params.id).populate("tipo")
    .then(gasto => {
      if (!gasto) return res.status(404).json({ message: "Gasto not found" });

      if (gasto.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.status(200).json(gasto);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving Gasto", error: err.message });
    });
});

// Update a Gasto by ID
gastoRouter.put("/:id", isAuthenticated, (req, res) => {
  Gasto.findById(req.params.id)
    .then(gasto => {
      if (!gasto) return res.status(404).json({ message: "Gasto not found" });

      if (gasto.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Gasto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    })
    .then(updatedGasto => {
      res.status(200).json(updatedGasto);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating Gasto", error: err.message });
    });
});

// Delete a Gasto by ID
gastoRouter.delete("/:id", isAuthenticated, (req, res) => {
  Gasto.findById(req.params.id)
    .then(gasto => {
      if (!gasto) return res.status(404).json({ message: "Gasto not found" });

      if (gasto.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Gasto.findByIdAndDelete(req.params.id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting Gasto", error: err.message });
    });
});

module.exports = gastoRouter;
