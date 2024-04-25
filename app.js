const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const crypto = require("crypto");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Middleware pour analyser les données de requête
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour la gestion des sessions d'utilisateur
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "casino",
});

// Vérification de la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Echec de la connexion à la base de données", err);
    return;
  }
  console.log("Connexion réussie à la base de données");
});

// Route pour servir la page login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

// Route pour la connexion de l'utilisateur
app.post("/connexion", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // Hashage du mot de passe pour comparaison avec celui stocké en base de données
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    // Requête SQL pour vérifier les identifiants de l'utilisateur
    connection.query(
      "SELECT * FROM utilisateurs WHERE email = ? AND password = ?",
      [email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Erreur lors de la requête à la base de données:", error);
          res.status(500).send("Erreur interne du serveur");
          return;
        }

        if (results.length > 0) {
          // Si les identifiants sont valides, stocker les données de l'utilisateur dans la session
          const { nom, prenom, credit } = results[0];
          req.session.user = { nom, prenom, credit };
          console.log(req.session.user); // Vérifier la session utilisateur dans la console
          
          // Redirection vers la page MachineSous.html avec les informations de l'utilisateur
          res.redirect(`/test.html?credit=${credit}`);

        } else {
          // Si les identifiants sont incorrects, renvoyer un message d'erreur
          res.send("Identifiants incorrects");
        }
      }
    );
  } else {
    // Si des champs requis sont manquants, renvoyer un message d'erreur
    res.status(400).send("Veuillez fournir une adresse e-mail et un mot de passe");
  }
});



// Route pour le traitement du formulaire d'inscription
app.post("/inscription", (req, res) => {
  const { nom, prenom, email, password } = req.body;

  if (nom && prenom && email && password) {
    // Hashage du mot de passe avant insertion en base de données
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    // Requête SQL pour insérer un nouvel utilisateur en base de données
    connection.query(
      'INSERT INTO utilisateurs (nom, prenom, email, password, credit) VALUES (?, ?, ?, ?, "100")',
      [nom, prenom, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Echec de l'insertion dans la base de données", error);
          res.status(500).send("Erreur interne du serveur");
          return;
        }

        // Stocker les données de l'utilisateur dans la session
        req.session.user = { nom, prenom, credit: 100 };
        // Redirection vers la page d'accueil avec les informations de l'utilisateur
        res.redirect(`/index.html?nom=${nom}&prenom=${prenom}&credit=100`);
      }
    );
  } else {
    res.send("Champs requis manquants");
  }
});

// Route pour la réinitialisation du mot de passe
app.post("/reset", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM utilisateurs WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res.status(500).send("Erreur interne du serveur");
        return;
      }

      if (results.length > 0) {
        const hashedPassword = crypto
          .createHash("md5")
          .update(password)
          .digest("hex");

        connection.query(
          "UPDATE utilisateurs SET password = ? WHERE email = ?",
          [hashedPassword, email],
          (updateError, updateResults) => {
            if (updateError) {
              console.error("Échec de la modification du mot de passe:", updateError);
              res.status(500).send("Erreur interne du serveur");
              return;
            }
            res.send("Mot de passe changé");
          }
        );
      } else {
        res.status(404).send("Email non trouvé");
      }
    }
  );
});

// Route pour mettre à jour le crédit du joueur dans la session et dans la base de données
app.post("/mise-a-jour-credit", (req, res) => {
  const miseGagnee = req.body.miseGagnee;

  // Mettre à jour le crédit du joueur dans la session
  req.session.user.credit += parseInt(miseGagnee);

  // Récupérer l'ID de l'utilisateur depuis la session
  const userId = req.session.user.id;
  const nouveauCredit = req.session.user.credit;

  // Mettre à jour le crédit du joueur dans la base de données
  connection.query(
    "UPDATE utilisateurs SET credit = ? WHERE id = ?",
    [nouveauCredit, userId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la mise à jour du crédit dans la base de données:", error);
        res.status(500).send("Erreur interne du serveur");
        return;
      }
      res.json({ success: true });
    }
  );
});

// Route pour servir la page accueil.html
app.get("/index.html", (req, res) => {
  const user = req.session.user;
  const nom = user ? user.nom : "";
  const prenom = user ? user.prenom : "";
  const credit = user ? user.credit : "";
  res.sendFile(path.join(__dirname, "/views/index.html"));
});


// Route pour servir la page MachineSous.html
app.get("/test.html", (req, res) => {
  const user = req.session.user; 
  const credit = user ? user.credit : "";
  res.sendFile(path.join(__dirname, "/views/test.html"));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
