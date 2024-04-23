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
 
 // Variable pour suivre si c'est la première fois que le jeu est lancé
 let isFirstTime = true;
 
 // Fonction principale pour jouer à la machine à sous
 function playSlotMachine() {
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
  if (isFirstTime) {
     isFirstTime = false;
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
 
 // Événement de clic sur le bouton "Jouer"
 const spinButton = document.getElementById('spinButton');
 spinButton.addEventListener('click', playSlotMachine);
 
 // Appel initial pour lancer le jeu au chargement de la page
 playSlotMachine();
 