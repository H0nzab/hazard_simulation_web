document.addEventListener("DOMContentLoaded", () => {
  const numbersGrid = document.getElementById("numbers-grid");
  const spinButton = document.getElementById("spin");
  const resetButton = document.getElementById("reset");
  const pointsDiv = document.getElementById("points");
  const resultDiv = document.getElementById("result");

  let points = 100;
  const bets = [];

  // Funkce pro přiřazení barvy
  function getNumberColor(number) {
    // Barvy podle evropské rulety
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    if (number === 0) return "zelená"; // Nula je zelená
    if (redNumbers.includes(number)) return "červená"; // Červená čísla
    return "černá"; // Černá čísla
  }

  // Dynamické generování tlačítek čísel
  for (let i = 1; i <= 36; i++) {
    const numberButton = document.createElement("button");
    numberButton.textContent = i;
    numberButton.dataset.type = "number";
    numberButton.dataset.value = i;
    
    // Přidáme třídu barvy na základě čísla
    const colorClass = getNumberColor(i);
    numberButton.classList.add(colorClass);
    
    numberButton.addEventListener("click", () => handleBet(numberButton));
    numbersGrid.appendChild(numberButton);
  }

  // Přidání tlačítka pro 0
  const zeroButton = document.getElementById("zero");
  zeroButton.addEventListener("click", () => handleBet(zeroButton));
  zeroButton.dataset.type = "number";
  zeroButton.dataset.value = 0;

  // Ovládací tlačítka sázek vlevo
  const betButtons = document.querySelectorAll(".bet");
  betButtons.forEach(button => {
    button.addEventListener("click", () => handleBet(button));
  });

  // Logika pro sázkové tlačítko
  function handleBet(button) {
    const type = button.dataset.type;
    const value = button.dataset.value;

    const existingBet = bets.find(bet => bet.type === type);
    if (existingBet) {
      existingBet.value = value;
    } else {
      bets.push({ type, value });
    }

    // Zvýraznění aktivního tlačítka
    document.querySelectorAll(`button[data-type="${type}"], #zero`).forEach(btn => {
      btn.style.opacity = "1"; // Reset opacity
    });
    button.style.opacity = "0.7"; // Zvýraznit
  }

  // Roztočení rulety
  spinButton.addEventListener("click", () => {
    const spinResult = Math.floor(Math.random() * 37);
    const spinColor = getNumberColor(spinResult);
    const spinRange = spinResult === 0 ? "none" : spinResult <= 18 ? "first-half" : "second-half";
    const spinParity = spinResult % 2 === 0 ? "even" : "odd";

    let pointsWon = 0;
    bets.forEach(bet => {
      if (bet.type === "number" && parseInt(bet.value) === spinResult) {
        pointsWon += 35; // Výhra při sázce na číslo
      } else if (bet.type === "color" && bet.value === spinColor) {
        pointsWon += 1; // Výhra při sázce na barvu
      } else if (bet.type === "range" && bet.value === spinRange) {
        pointsWon += 1; // Výhra při sázce na rozsah
      } else if (bet.type === "even" && bet.value === "even" && spinParity === "even") {
        pointsWon += 1; // Výhra při sázce na sudé
      } else if (bet.type === "odd" && bet.value === "odd" && spinParity === "odd") {
        pointsWon += 1; // Výhra při sázce na liché
      }
    });

    points -= bets.length; // Odečti body za sázky
    points += pointsWon;

    pointsDiv.textContent = `Kč: ${points}`;
    resultDiv.innerHTML = `
      <p>Výsledek roztočení: <strong>${spinResult}</strong> (${spinColor})</p>
      <p>Kč získáno: <strong>${pointsWon}</strong></p>
    `;

    // Vymazání sázek po každém kole
    bets.length = 0;
    document.querySelectorAll(".bet, button[data-type='number'], #zero").forEach(button => {
      button.style.opacity = "1";
    });
  });

  // Reset tlačítko
  resetButton.addEventListener("click", () => {
    bets.length = 0;
    points = 100;
    pointsDiv.textContent = `Kč: ${points}`;
    resultDiv.innerHTML = "";
    document.querySelectorAll(".bet, button[data-type='number'], #zero").forEach(button => {
      button.style.opacity = "1";
    });
  });
});
