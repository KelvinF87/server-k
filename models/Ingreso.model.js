// @filename: models/Ingreso.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const IngresoSchema = new Schema({
  ingreso: { type: Number, required: true, min: 0 },
  tipo: { type: Schema.Types.ObjectId, ref: "TipoEntrada", required: true },
  balance: { type: Number, default: 0 },
  detalles: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

const Ingreso = mongoose.model("Ingreso", IngresoSchema);
module.exports = Ingreso;