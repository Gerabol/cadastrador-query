const mongoose = require('mongoose');
const AutorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  setor: String,
  criado_em: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Autor', AutorSchema);