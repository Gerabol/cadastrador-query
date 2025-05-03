const mongoose = require('mongoose');
const QuerySchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo_banco: { type: String, required: true },
  query: { type: String, required: true },
  tabelas: [String],
  campos: [String],
  autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true },
  ativo: { type: Number, default: 1 },
  criado_em: { type: Date, default: Date.now }, 
  
}, { timestamps: true });
module.exports = mongoose.model('Query', QuerySchema);