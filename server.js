const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques du dossier casino
app.use(express.static(path.join(__dirname, 'casino')));

// Cette route gère toutes les autres requêtes et renvoie le fichier index.html de l'application Vue.js
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/casino', 'index.html'));

});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
