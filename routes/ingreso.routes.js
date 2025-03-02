const express = require("express");
const Ingreso = require("../models/Ingreso.model");
const { isAuthenticated, authorizeRoles } = require("../middleware/jwt.middleware");

const ingresoRouter = express.Router();


// Create a new Ingreso
ingresoRouter.post("/", isAuthenticated, (req, res) => {
    const newIngresoData = { ...req.body, user: req.payload._id };
    Ingreso.create(newIngresoData)
      .then(newIngreso => {
        res.status(201).json(newIngreso);
      })
      .catch(err => {
        res.status(500).json({ message: "Error creating Ingreso", error: err.message });
      });
  });

// Get all Ingresos for a user or admin
ingresoRouter.get("/", isAuthenticated, authorizeRoles("admin", "user"), (req, res) => {
  if (req.payload.roles.includes("admin")) {
    Ingreso.find().populate("tipo")
      .then(ingresos => {
        res.status(200).json(ingresos);
      })
      .catch(err => {
        res.status(500).json({ message: "Error retrieving Ingresos", error: err.message });
      });
  } else {
    Ingreso.find({ user: req.payload._id }).populate("tipo")
      .then(ingresos => {
        res.status(200).json(ingresos);
      })
      .catch(err => {
        res.status(500).json({ message: "Error retrieving Ingresos", error: err.message });
      });
  }
});

// Get a single Ingreso by ID
ingresoRouter.get("/:id", isAuthenticated, (req, res) => {
  Ingreso.findById(req.params.id).populate("tipo")
    .then(ingreso => {
      if (!ingreso) return res.status(404).json({ message: "Ingreso not found" });

      if (ingreso.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.status(200).json(ingreso);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving Ingreso", error: err.message });
    });
});

// Update an Ingreso by ID
ingresoRouter.put("/:id", isAuthenticated, (req, res) => {
  Ingreso.findById(req.params.id)
    .then(ingreso => {
      if (!ingreso) return res.status(404).json({ message: "Ingreso not found" });

      if (ingreso.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Ingreso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    })
    .then(updatedIngreso => {
      res.status(200).json(updatedIngreso);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating Ingreso", error: err.message });
    });
});

// Delete an Ingreso by ID
ingresoRouter.delete("/:id", isAuthenticated, (req, res) => {
  Ingreso.findById(req.params.id)
    .then(ingreso => {
      if (!ingreso) return res.status(404).json({ message: "Ingreso not found" });

      if (ingreso.user.toString() !== req.payload._id && !req.payload.roles.includes("admin")) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Ingreso.findByIdAndDelete(req.params.id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting Ingreso", error: err.message });
    });
});

module.exports = ingresoRouter;
