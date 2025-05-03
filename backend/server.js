// Importa os módulos necessários
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializa a aplicação Express
const app = express();

// Habilita o uso de CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Permite que o servidor aceite dados em JSON no corpo das requisições
app.use(express.json());

// Conecta ao banco de dados MongoDB (no container "mongo", banco chamado "query_catalog")
mongoose.connect('mongodb://mongo:27017/query_catalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Importa os modelos (schemas) de Autor e Query.
const Autor = require('./models_Autor');
const Query = require('./models_Query');

// Rota GET para listar todos os autores
app.get('/autores', async (req, res) => {
  const autores = await Autor.find();
  res.json(autores);
});

// Rota POST para cadastrar um novo autor
app.post('/autores', async (req, res) => {
  try {
    const autor = new Autor(req.body); // Cria novo autor com os dados enviados
    await autor.save();                // Salva no banco
    res.status(201).json(autor);       // Retorna o autor criado
  } catch (err) {
    res.status(400).json({ error: err.message }); // Retorna erro caso ocorra
  }
});

// Rota GET para listar todas as queries ativas, incluindo os dados do autor
app.get('/queries', async (req, res) => {
  const queries = await Query.find({ ativo: 1 }).populate('autor_id');
  res.json(queries);
});

// Rota POST para cadastrar uma nova query (sempre inicia como ativa)
app.post('/queries', async (req, res) => {
  try {
    const query = new Query({ ...req.body, ativo: 1 });
    await query.save();
    res.status(201).json(query);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota PUT para atualizar uma query existente pelo ID
app.put('/queries/:id', async (req, res) => {
  try {
    const queryAtualizada = await Query.findByIdAndUpdate(
      req.params.id, // ID da query na URL
      req.body,      // Dados enviados
      { new: true, runValidators: true } // Retorna o novo valor e valida os dados
    );
    res.json(queryAtualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota DELETE (falso delete): desativa a query, não remove do banco
app.delete('/queries/:id', async (req, res) => {
  const result = await Query.findByIdAndUpdate(req.params.id, { ativo: 0 });
  res.json({ message: 'Query desativada com sucesso' });
});

// Rota GET para retornar estatísticas sobre as queries
app.get('/estatisticas', async (req, res) => {
  try {
    const totalQueries = await Query.countDocuments({ ativo: 1 }); // Total de queries ativas

    // Busca o tipo de banco mais usado entre as queries ativas
    const tipoBancoAggregate = await Query.aggregate([
      { $match: { ativo: 1 } },
      { $group: { _id: "$tipo_banco", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const tipoBancoMaisUsado = tipoBancoAggregate.length > 0 
      ? { tipo: tipoBancoAggregate[0]._id, quantidade: tipoBancoAggregate[0].count }
      : { tipo: "Nenhum", quantidade: 0 };

    // Busca a tabela mais cadastrada entre as queries
    const tabelaAggregate = await Query.aggregate([
      { $match: { ativo: 1 } },
      { $unwind: "$tabelas" }, // Divide arrays de tabelas
      { $group: { _id: "$tabelas", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const tabelaMaisCadastrada = tabelaAggregate.length > 0
      ? { tabela: tabelaAggregate[0]._id, quantidade: tabelaAggregate[0].count }
      : { tabela: "Nenhuma", quantidade: 0 };

    const estatisticas = {
      totalQueries,
      tipoBancoMaisUsado,
      tabelaMaisCadastrada,
      totalEtiquetas: 0 // Valor fixo, pois não há mais uso de etiquetas
    };

    res.json(estatisticas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota GET para retornar as 3 queries mais recentes
app.get('/ultimas-3-queries', async (req, res) => {
  try {
    const ultimasQueries = await Query.find({ ativo: 1 })
      .populate('autor_id')
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(ultimasQueries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota GET para retornar todas as queries ativas ordenadas por data (mais recentes primeiro)
app.get('/ultimas-queries', async (req, res) => {
  try {
    const ultimasQueries = await Query.find({ ativo: 1 })
      .populate('autor_id')
      .sort({ createdAt: -1 });

    res.json(ultimasQueries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('API rodando na porta 3000'));
