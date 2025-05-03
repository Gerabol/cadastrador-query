const mongoose = require('mongoose');
const AutorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  //campo email obrigatório e formato validado
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Formato de e-mail inválido']
  },
  //email: { type: String, required: true },
  //setor: String,
  //Setor default 'Não informado'
  setor: { type: String, default: 'Não informado' },
  
  criado_em: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Autor', AutorSchema);