const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques depuis le dossier de l'application Vue.js
app.use(express.static(path.join(__dirname, 'client/dist')));

// Définir d'autres routes de votre application Node.js

// Route d'exemple
app.get('/api/data', (req, res) => {
    res.json({ message: 'Données provenant du serveur Node.js' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
