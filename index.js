const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5006;

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const gastoRouter = require("./routes/gasto.routes");
const ingresoRouter = require("./routes/ingreso.routes");
const tipoEntradaRouter = require("./routes/tipoEntrada.routes");
const reportRouter = require("./routes/report.routes");
const { isAuthenticated } = require("./middleware/jwt.middleware");

// Create mongoose connection with DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Salir del proceso si no se puede conectar
  });
// INITIALIZE EXPRESS APP
const app = express();

// Divide la cadena en un arreglo
const allowedOrigins = process.env.CORS_URI.split(',').map(origin => origin.trim());
app.use(cors({
  origin: allowedOrigins,
  credentials: true // Importante para cookies en CORS
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.use("/api/users", userRouter); // Removed isAuthenticated, handled in route
app.use("/auth", authRouter);
app.use("/api/gastos", gastoRouter);
app.use("/api/ingresos", ingresoRouter);
app.use("/api/tipo-entradas", tipoEntradaRouter);
app.use("/api/reports", reportRouter);

// Error handling middleware (Centralized)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});