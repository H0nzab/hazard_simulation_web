// Pole symbolů pro hrací automat
const symbols = ['🍒', '🔔', '🍋', '⭐', '🍉', '🍊', '🍓', '7️⃣', 'BAR'];

// Kombinace výher pro různé počty shodných symbolů (koeficienty výhry)
const winCombinations = {
  3: { '🍒': 100, '🔔': 100, '🍋': 100, '⭐': 100, '🍉': 200, '🍊': 200, '🍓': 250, '7️⃣': 500, 'BAR': 500 },
  2: { '🍒': 2, '🔔': 2, '🍋': 2, '⭐': 2, '🍉': 2, '🍊': 10, '🍓': 10, '7️⃣': 50, 'BAR': 50 }  // Doplňujeme výhry pro 2 stejné symboly (včetně 7️⃣ a BAR)
};

// Počáteční stav účtu
let accountBalance = 500;

// Počáteční hodnota sázky
let currentBet = 10;

// Funkce pro nastavení sázky
function setBet(amount) {
  currentBet = amount;
  document.getElementById('result').innerText = `Sázka nastavena na ${currentBet} Kč`;
}

// Funkce pro roztočení automatu
function spin() {
  if (accountBalance < currentBet) {
    alert('Nemáte dostatek peněz pro další hru.');
    return;
  }

  // Odečteme sázku z účtu
  accountBalance -= currentBet;

  // Vygenerujeme náhodné symboly pro tři sloty
  const result = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);

  // Aktualizujeme sloty na stránce
  document.getElementById('slot1').innerText = result[0];
  document.getElementById('slot2').innerText = result[1];
  document.getElementById('slot3').innerText = result[2];

  // Spočítáme výskyt jednotlivých symbolů
  const symbolCounts = result.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {});

  // Nejprve zkontrolujeme, zda máme nějaké výherní kombinace
  let winPoints = 0;

  // Pokud máme 3 stejné symboly, použijeme větší koeficient (výhra je násobena sázkou)
  Object.entries(symbolCounts).forEach(([symbol, count]) => {
    if (winCombinations[count] && winCombinations[count][symbol]) {
      winPoints = winCombinations[count][symbol] * currentBet; // Výhra je násobena sázkou
    }
  });

  // Pokud nejsou žádné výhry (třeba dva stejné symboly), hráč ztrácí sázku
  if (winPoints === 0) {
    winPoints = -currentBet; // Ztráta sázky
  }

  // Přidáme výhru (nebo ztrátu) k účtu
  accountBalance += winPoints;

  // Aktualizujeme výsledek na stránce
  if (winPoints > 0) {
    document.getElementById('result').innerText = `Výhra: ${winPoints} Kč!`;
  } else {
    document.getElementById('result').innerText = `Prohra: Ztráta ${Math.abs(winPoints)} Kč.`;
  }

  // Aktualizujeme zůstatek na účtu
  document.getElementById('account').innerText = `${accountBalance} Kč`;

  // Resetujeme sázku na výchozí hodnotu
  resetBets();
}

// Funkce pro resetování sázek (odznačení tlačítek)
function resetBets() {
  const betButtons = document.querySelectorAll('.betting-options .btn');
  betButtons.forEach(button => {
    button.style.backgroundColor = 'rgba(240, 240, 240, 0.5)';
  });
}

// Funkce pro vizuální označení aktuální sázky
function highlightCurrentBet() {
  const betButtons = document.querySelectorAll('.betting-options .btn');
  betButtons.forEach(button => {
    if (parseInt(button.innerText.split(" ")[1]) === currentBet) {
      button.style.backgroundColor = '#ffd700';
    } else {
      button.style.backgroundColor = 'rgba(240, 240, 240, 0.5)';
    }
  });
}

// Zavoláme funkci pro označení aktuální sázky při každé změně
document.querySelectorAll('.betting-options .btn').forEach(button => {
  button.addEventListener('click', () => {
    setBet(parseInt(button.innerText.split(" ")[1]));
    highlightCurrentBet();
  });
});
