const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/ping', (req, res) => {
  res.json({ ok: true });
});

module.exports = app;