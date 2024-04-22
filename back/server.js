// Importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');

// Créer une application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Utiliser bodyParser pour traiter les données JSON dans les requêtes
app.use(bodyParser.json());

// Endpoint POST pour recevoir les données de la machine à sous
app.post('/tour-machine-a-sous', (req, res) => {
  // Récupérer les données envoyées par le client depuis le corps de la requête
  const donneesMachineASous = req.body;

  // Vérifier si le tour est gagnant ou non
  if (donneesMachineASous.resultat === 'gagnant') {
    // Si c'est le cas, afficher "gagné" dans le terminal
    console.log('Gagné !');
  } else {
    // Sinon, afficher "perdu" dans le terminal
    console.log('Perdu !');
  }

  // Envoyer une réponse au client
  res.sendStatus(200);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
