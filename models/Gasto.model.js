// models/Gasto.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema

const GastoSchema = new Schema({
  gasto: { type: Number, required: true, min: 0 },
  tipo: { type: Schema.Types.ObjectId, ref: "TipoEntrada", required: true },
  balance: { type: Number, default: 0 },
  detalles: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created: { type: Date, default: Date.now }
}, { timestamps: true }); // Add timestamps

const Gasto = mongoose.model("Gasto", GastoSchema);
module.exports = Gasto;
