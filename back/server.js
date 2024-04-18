// back/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/data', (req, res) => {
    res.json({ message: 'Données provenant du serveur Node.js' });
});

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
