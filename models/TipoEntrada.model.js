
// models/TipoEntrada.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TipoEntradaSchema = new Schema({
  name: { type: String, required: true, unique: true },
  tipo: { type: [String], required: true, default: ["ingreso", "Gasto"] },
  created: { type: Date, default: Date.now }
}, { timestamps: true }); // Add timestamps

const TipoEntrada = mongoose.model("TipoEntrada", TipoEntradaSchema);
module.exports = TipoEntrada;

