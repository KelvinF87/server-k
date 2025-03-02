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
const { isAuthenticated } = require("./middleware/jwt.middleware");

// Create mongoose connection with DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors({
  origin: [process.env.CORS_URI]
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.use("/api/users", isAuthenticated, userRouter);
app.use("/auth", authRouter);
app.use("/api/gastos", isAuthenticated, gastoRouter);
app.use("/api/ingresos", isAuthenticated, ingresoRouter);
app.use("/api/tipo-entradas", isAuthenticated, tipoEntradaRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
