const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', (req, res) => {
  const url = 'http://backend-query:3000' + req.url;
  req.pipe(require('http').request(url, {
    method: req.method,
    headers: req.headers
  }, r => {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res);
  })).on('error', () => res.sendStatus(502));
});
app.listen(5173, () => console.log('Frontend Vue rodando em http://localhost:5173'));
