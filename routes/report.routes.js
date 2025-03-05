// routes/report.routes.js
const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Ingreso = require("../models/Ingreso.model");
const Gasto = require("../models/Gasto.model");
const mongoose = require("mongoose");
const reportRouter = express.Router();

reportRouter.get("/balance", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;

    // Get total ingresos
    const totalIngresos = await Ingreso.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$ingreso" } } },
    ]);

    // Get total gastos
    const totalGastos = await Gasto.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$gasto" } } },
    ]);

    const balance = (totalIngresos[0]?.total || 0) - (totalGastos[0]?.total || 0);

    res.status(200).json({ balance });
  } catch (error) {
    console.error("Error getting balance:", error);
    res.status(500).json({ message: "Error getting balance", error: error.message });
  }
});

reportRouter.get("/expenses", isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id;
      const { startDate, endDate } = req.query; // Get start and end dates from query parameters
  
      const match = {
        user: new mongoose.Types.ObjectId(userId),
      };
  
      if (startDate && endDate) {
        match.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
  
      const expensesByDate = await Gasto.aggregate([
        { $match: match },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            total: { $sum: "$gasto" },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date
      ]);
      res.status(200).json(expensesByDate);
    } catch (error) {
      console.error("Error getting expenses by date:", error);
      res.status(500).json({ message: "Error getting expenses by date", error: error.message });
    }
  });
  
  reportRouter.get("/income", isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id;
      const { startDate, endDate } = req.query;
  
      const match = {
        user: new mongoose.Types.ObjectId(userId),
      };
  
      if (startDate && endDate) {
        match.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
  
      const incomeByDate = await Ingreso.aggregate([
        { $match: match },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            total: { $sum: "$ingreso" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json(incomeByDate);
    } catch (error) {
      console.error("Error getting income by date:", error);
      res.status(500).json({ message: "Error getting income by date", error: error.message });
    }
  });

  reportRouter.get("/alldata", isAuthenticated, async (req, res) => {
    try {
        const userId = req.payload._id;
        const { startDate, endDate } = req.query;  // Obtén startDate y endDate de los query params

        // Validar que startDate y endDate tengan valores
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "startDate and endDate are required" });
        }

        // Convertir startDate y endDate a objetos Date
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Validar que las fechas sean válidas
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const totalIngresos = await Ingreso.aggregate([
            { $match: {
                user: new mongoose.Types.ObjectId(userId),
            }},
            { $group: { _id: null, total: { $sum: "$ingreso" } } }
        ]);

        const totalGastos = await Gasto.aggregate([
            { $match: {
                user: new mongoose.Types.ObjectId(userId),
            }},
            { $group: { _id: null, total: { $sum: "$gasto" } } }
        ]);

        const balance = (totalIngresos[0]?.total || 0) - (totalGastos[0]?.total || 0);

        const expensesByDate = await Gasto.aggregate([
            { $match: {
                user: new mongoose.Types.ObjectId(userId),
                createdAt: {   // Filtra por fecha
                    $gte: startDateObj,
                    $lte: endDateObj
                }
            }},
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$gasto" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const incomeByDate = await Ingreso.aggregate([
            { $match: {
                user: new mongoose.Types.ObjectId(userId),
                createdAt: {   // Filtra por fecha
                    $gte: startDateObj,
                    $lte: endDateObj
                }
            }},
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$ingreso" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.status(200).json({
            balance: balance,
            expenses: expensesByDate,
            incomes: incomeByDate,
        });
    } catch (error) {
        console.error("Error in /alldata route:", error.stack);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});
  
  
  module.exports = reportRouter;