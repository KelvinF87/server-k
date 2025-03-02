const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngresoSchema = new Schema({
  ingreso: { type: Number, required: true, min: 0 },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: "TipoEntrada", required: true },
  balance: { type: Number, default: 0 },
  detalles: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created: { type: Date, default: Date.now }
});

const Ingreso = mongoose.model("Ingreso", IngresoSchema);
module.exports = Ingreso;
