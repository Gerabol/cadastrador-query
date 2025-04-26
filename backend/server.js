const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/query_catalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Autor = require('./models_Autor');
const Query = require('./models_Query');

app.get('/autores', async (req, res) => {
  const autores = await Autor.find();
  res.json(autores);
});

app.post('/autores', async (req, res) => {
  try {
    const autor = new Autor(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/queries', async (req, res) => {
  const queries = await Query.find({ ativo: 1 }).populate('autor_id');
  res.json(queries);
});

app.post('/queries', async (req, res) => {
  try {
    const query = new Query({ ...req.body, ativo: 1 });
    await query.save();
    res.status(201).json(query);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/queries/:id', async (req, res) => {
  const result = await Query.findByIdAndUpdate(req.params.id, { ativo: 0 });
  res.json({ message: 'Query desativada com sucesso' });
});

app.get('/estatisticas', async (req, res) => {
  try {
    const totalQueries = await Query.countDocuments({ ativo: 1 });

    const tipoBancoAggregate = await Query.aggregate([
      { $match: { ativo: 1 } },
      { $group: { _id: "$tipo_banco", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const tipoBancoMaisUsado = tipoBancoAggregate.length > 0 
      ? { tipo: tipoBancoAggregate[0]._id, quantidade: tipoBancoAggregate[0].count }
      : { tipo: "Nenhum", quantidade: 0 };

    const tabelaAggregate = await Query.aggregate([
      { $match: { ativo: 1 } },
      { $unwind: "$tabelas" },
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
      totalEtiquetas: 0 // substituído por 0 fixo, já que não existem mais etiquetas
    };

    res.json(estatisticas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.listen(3000, () => console.log('API rodando na porta 3000'));
