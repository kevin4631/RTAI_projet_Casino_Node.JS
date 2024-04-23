<template>
    <div class="container">
      <h1>Bienvenue au Casino Royal</h1>
      <img class="logo" src="/casino-logo.png" alt="Logo du Casino Royal">
      <p>Bienvenue au Casino Royal, le meilleur casino en ligne pour les amateurs de jeux de hasard et de divertissement ! Que vous soyez un joueur chevronné ou un débutant, vous trouverez une large sélection de jeux passionnants pour vous divertir et vous faire vivre une expérience inoubliable.</p>
      <p>Découvrez nos jeux de table classiques comme le blackjack, la roulette et le poker, ou plongez dans l'excitation des machines à sous avec des jackpots progressifs et des graphismes époustouflants. Nous proposons également des jeux en direct où vous pouvez interagir avec de vrais croupiers et vivre l'ambiance authentique d'un casino terrestre depuis le confort de votre domicile.</p>
      <p>Rejoignez-nous dès aujourd'hui et profitez de nos offres de bienvenue, de promotions exclusives et de récompenses généreuses. Notre équipe dévouée est là pour vous offrir une expérience de jeu sécurisée, équitable et divertissante à tout moment.</p>
      <p>N'attendez plus, inscrivez-vous dès maintenant et faites partie de la communauté du Casino Royal !</p>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'CasinoPresentation', // Nom du composant
    // Données du composant
    data() {
      return {
        // Vous pouvez définir des données ici si nécessaire
      };
    },
    // Méthodes du composant
    methods: {
      // Vous pouvez définir des méthodes ici si nécessaire
    },
  };
  </script>
  
  <style scoped>
  /* Styles CSS spécifiques au composant */
  .container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  p {
    text-align: justify;
    color: #666;
  }
  
  .logo {
    display: block;
    margin: 0 auto;
    width: 200px;
  }
  </style>
  