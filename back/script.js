// Fonction pour générer un symbole aléatoire entre 1 et 8
function getRandomSymbol() {
  return Math.floor(Math.random() * 8) + 1;
}

// Fonction pour obtenir le chemin d'accès à l'image d'un symbole
function getSymbolByNumber(number) {
  switch (number) {
    case 1:
      return "images/cerise.png";
    case 2:
      return "images/citron.png";
    case 3:
      return "images/orange.png";
    case 4:
      return "images/raisins.png";
    case 5:
      return "images/pasteque.png";
    case 6:
      return "images/cloche.png";
    case 7:
      return "images/bar.png";
    case 8:
      return "images/sept.png";
    default:
      return "";
  }
}

const gains = {
  "1": 10,   // Combinaison gagnante avec au moins 3 symboles identiques
  "2": 5,    // Combinaison gagnante avec au moins 3 symboles identiques
  "3": 20,   // Combinaison gagnante avec au moins 3 symboles identiques
  "4": 15,   // Combinaison gagnante avec au moins 3 symboles identiques
  "5": 30,   // Combinaison gagnante avec au moins 3 symboles identiques
  "6": 25,   // Combinaison gagnante avec au moins 3 symboles identiques
  "7": 40,   // Combinaison gagnante avec au moins 3 symboles identiques
  "8": 35    // Combinaison gagnante avec au moins 3 symboles identiques
  // Vous pouvez ajouter d'autres combinaisons gagnantes avec les montants de gains correspondants
};

// Fonction pour vérifier les gains
function checkWin(symbols) {
  const middleRow = symbols[1]; // Récupérer la ligne du milieu
  const uniqueSymbols = new Set(middleRow); // Utiliser un ensemble pour obtenir les symboles uniques
  let winResult = { isWin: false, gain: 0 };

  // Vérifier s'il y a au moins trois symboles identiques sur la ligne du milieu
  for (let symbol of uniqueSymbols) {
    const count = middleRow.filter(s => s === symbol).length;
    if (count >= 3) {
      winResult.isWin = true;
      winResult.gain = gains[symbol];
      break; // Sortir de la boucle dès qu'une combinaison gagnante est trouvée
    }
  }

  return winResult;
}
// Variable pour suivre si c'est la première fois que le jeu est lancé
let isFirstTime = false;

// Fonction principale pour jouer à la machine à sous
function playSlotMachine() {
  const creditInput = document.getElementById('creditInput');
  const currentCredit = parseInt(creditInput.value);

  // Vérifier si l'utilisateur a suffisamment de crédits pour jouer
  if (currentCredit >= 20) {
    // Soustraire 20 crédits pour jouer une partie
    creditInput.value = currentCredit - 20;
  } else {
    alert("Vous n'avez pas assez de crédits pour jouer !");
    return; // Arrêter la fonction si l'utilisateur n'a pas assez de crédits
  }

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

  // Ajouter une classe d'animation pour démarrer l'animation
  slotMachine.classList.add('spin-animation');

  // Arrêter l'animation après un certain délai (par exemple, 3 secondes)
  setTimeout(() => {
    // Supprimer la classe d'animation pour arrêter l'animation
    slotMachine.classList.remove('spin-animation');

    // Vérifier si le joueur a gagné
    const winResult = checkWin(symbols);
    if (winResult.isWin) {
      // Ajouter les crédits gagnés au solde actuel
      creditInput.value = currentCredit + winResult.gain;
      resultDiv.textContent = `Félicitations ! Vous avez gagné ${winResult.gain} crédits !`;
    } else {
      resultDiv.textContent = 'Dommage ! Essayez encore !';
    }
  }, 3000);
}

// Événement de clic sur le bouton "Jouer"
const spinButton = document.getElementById('spinButton');
spinButton.addEventListener('click', playSlotMachine);
