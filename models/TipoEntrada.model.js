const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TipoEntradaSchema = new Schema({
  name: { type: String, required: true, unique: true },
  tipo: { type: [String], required: true, default: ["ingreso", "Gasto"] },
  created: { type: Date, default: Date.now }
});

const TipoEntrada = mongoose.model("TipoEntrada", TipoEntradaSchema);
module.exports = TipoEntrada;
