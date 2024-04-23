const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));


app.post('/', (req, res) => {
  // Code pour gérer la requête POST
});

app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
