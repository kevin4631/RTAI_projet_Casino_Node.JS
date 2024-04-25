const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Affiche des fichiers statiques
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/test.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/test.html'));
});

app.get('/MachineSous.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/MachineSous.html'));
});

app.listen(port, () => {
  console.log('serveur lancé !');
})