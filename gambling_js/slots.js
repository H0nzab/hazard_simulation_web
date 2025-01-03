const symbols = ['🍒', '🔔', '🍋', '⭐', '🍉', '🍊', '🍓', '7️⃣', 'BAR'];
const winCombinations = {
    3: { '🍒': 10, '🔔': 10, '🍋': 10, '⭐': 10, '🍉': 10, '🍊': 50, '🍓': 50, '7️⃣': 100, 'BAR': 100 },
    2: { '🍒': 5, '🔔': 5, '🍋': 5, '⭐': 5, '🍉': 5 }
};

let accountBalance = 500;

function spin() {
    if (accountBalance < 10) {
        alert('Nemáte dostatek peněz pro další hru.');
        return;
    }

    accountBalance -= 10;

    // Vygeneruj náhodné symboly pro tři sloty
    const result = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);

    // Aktualizuj sloty na stránce
    document.getElementById('slot1').innerText = result[0];
    document.getElementById('slot2').innerText = result[1];
    document.getElementById('slot3').innerText = result[2];

    // Spočítej výskyt jednotlivých symbolů
    const symbolCounts = result.reduce((acc, symbol) => {
        acc[symbol] = (acc[symbol] || 0) + 1;
        return acc;
    }, {});

    // Najdi maximální počet stejných symbolů
    const maxCount = Math.max(...Object.values(symbolCounts));

    // Zjisti výhru podle počtu stejných symbolů
    const winPoints = Object.entries(symbolCounts).reduce((win, [symbol, count]) => {
        if (winCombinations[count] && winCombinations[count][symbol]) {
            return winCombinations[count][symbol];
        }
        return win;
    }, 0);

    accountBalance += winPoints;

    // Aktualizuj výstup na stránce
    document.getElementById('result').innerText = `Výhra: ${winPoints} Kč`;
    document.getElementById('account').innerText = `Stav účtu: ${accountBalance}`;
}