<template>
  <div class="container">
    <h1>Machine à Sous</h1>
    <div id="slotMachine" class="slot-machine">
      <div class="row high-line">
        <!-- Utilisez un ID unique pour chaque symbole -->
        <img id="symbol1" class="symbol" alt="Cerise">
        <img id="symbol2" class="symbol" alt="Citron">
        <!-- Ajoutez les balises img pour les autres symboles -->
      </div>
      <!-- Ajoutez des balises div pour les autres lignes -->
      <div class="row">
        <!-- Ajoutez des balises div pour les autres lignes -->
      </div>
      <div class="row low-line">
        <!-- Ajoutez des balises div pour les autres lignes -->
      </div>
    </div>

    <button id="spinButton">Jouer</button>
    <div id="result"></div>
  </div>
</template>

<script>
// Fonction pour générer un symbole aléatoire entre 1 et 8
function getRandomSymbol() {
  return Math.floor(Math.random() * 8) + 1;
}

function getSymbolByNumber(number) {
  switch (number) {
    case 1:
      return "/imagesMachineSous/cerise.png";
    case 2:
      return "/imagesMachineSous/citron.png";
    case 3:
      return "/imagesMachineSous/orange.png";
    case 4:
      return "/imagesMachineSous/raisins.png";
    case 5:
      return "/imagesMachineSous/pasteque.png";
    case 6:
      return "/imagesMachineSous/cloche.png";
    case 7:
      return "/imagesMachineSous/bar.png";
    case 8:
      return "/imagesMachineSous/sept.png";
    default:
      return "";
  }
}


// Fonction pour vérifier les gains
function checkWin(symbols) {
  let match = false;
  if (
    symbols[1][0] === symbols[1][1] && symbols[1][1] === symbols[1][2] ||
    symbols[1][1] === symbols[1][2] && symbols[1][2] === symbols[1][3] ||
    symbols[1][2] === symbols[1][3] && symbols[1][3] === symbols[1][4] ||
    symbols[1][0] === symbols[1][1] && symbols[1][1] === symbols[1][3] ||
    symbols[1][0] === symbols[1][1] && symbols[1][1] === symbols[1][4] ||
    symbols[1][1] === symbols[1][2] && symbols[1][2] === symbols[1][4] ||
    symbols[1][1] === symbols[1][3] && symbols[1][3] === symbols[1][4] ||
    symbols[1][0] === symbols[1][3] && symbols[1][3] === symbols[1][4] ||
    symbols[1][0] === symbols[1][2] && symbols[1][2] === symbols[1][3]
  ) {
    match = true;
  }
  return match;
}

export default {
  name: 'MachineASous',
  data() {
    return {
      isFirstTime: true
    }
  },
  methods: {
    playSlotMachine() {
      const slotMachine = document.getElementById('slotMachine');
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = '';

      slotMachine.innerHTML = '';

      const symbols = [];

      // Génération des symboles et affichage sur la machine à sous
      for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        const rowSymbols = [];
        for (let j = 0; j < 5; j++) {
          const symbolNumber = getRandomSymbol();
          const symbolElement = document.createElement('img');
          symbolElement.classList.add('symbol');
          symbolElement.src = getSymbolByNumber(symbolNumber);
          row.appendChild(symbolElement);
          rowSymbols.push(symbolNumber);
        }
        symbols.push(rowSymbols);
        slotMachine.appendChild(row);
      }

      // Appliquer progressivement l'opacité aux symboles après leur génération
      const symbolsToAnimate = document.querySelectorAll('.symbol');
      symbolsToAnimate.forEach((symbol, index) => {
        setTimeout(() => {
          symbol.style.opacity = '1';
        }, index * 200);
      });

      // Si c'est la première fois que le jeu est lancé, ne vérifiez pas la victoire automatiquement
      if (this.isFirstTime) {
        this.isFirstTime = false;
      } else {
        // Ajouter une classe d'animation pour démarrer l'animation
        slotMachine.classList.add('spin-animation');

        // Arrêter l'animation après un certain délai (par exemple, 3 secondes)
        setTimeout(() => {
          // Supprimer la classe d'animation pour arrêter l'animation
          slotMachine.classList.remove('spin-animation');

          // Vérification des combinaisons gagnantes et calcul des gains
          const isWin = checkWin(symbols);
          if (isWin) {
            resultDiv.textContent = 'Félicitations ! Vous avez gagné !';
          } else {
            resultDiv.textContent = 'Dommage ! Essayez encore !';
          }

        }, 3000);
      }
    }
  },
  mounted() {
    // Événement de clic sur le bouton "Jouer"
    const spinButton = document.getElementById('spinButton');
    spinButton.addEventListener('click', this.playSlotMachine);

    // Appel initial pour lancer le jeu au chargement de la page
    this.playSlotMachine();
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.container {
  text-align: center;
  margin-top: 50px;
}

.slot-machine {
  display: flex;
  flex-direction: column;
  align-items: center; /* Pour centrer horizontalement */
}

.row {
  display: flex;
}

.symbol {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 5px;
  text-align: center;
  line-height: 50px;
  opacity: 0; /* Commencez avec une opacité de 0 */
  transition: opacity 0.5s ease-in-out; /* Transition pour une apparence progressive */
}

/* Masquer la moitié supérieure des images en haut */
.high-line .symbol {
  overflow: hidden;
  height: 25px; /* Ajustez la hauteur selon vos besoins */
}

/* Masquer la moitié inférieure des images en bas */
.low-line .symbol {
  overflow: hidden;
  height: 25px; /* Ajustez la hauteur selon vos besoins */
}
</style>
