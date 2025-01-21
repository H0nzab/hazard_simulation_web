document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spin");
    const resultDiv = document.getElementById("result");
    const pointsDiv = document.getElementById("points");
  
    let points = 100;
    const bets = [];
  
    document.querySelectorAll(".bet").forEach(button => {
      button.addEventListener("click", () => {
        const type = button.dataset.type;
        const value = button.dataset.value;
  
        const existingBet = bets.find(bet => bet.type === type);
        if (existingBet) {
          existingBet.value = value;
        } else {
          bets.push({ type, value });
        }
  
        document.querySelectorAll(`.bet[data-type="${type}"]`).forEach(btn => {
          btn.style.opacity = "1"; // Reset opacity
        });
        button.style.opacity = "0.7"; // Highlight
      });
    });
  
    spinButton.addEventListener("click", () => {
      const spinResult = Math.floor(Math.random() * 37);
      const spinColor = spinResult === 0 ? "green" : spinResult % 2 === 0 ? "black" : "red";
      const spinRange = spinResult === 0 ? "none" : spinResult <= 18 ? "first-half" : "second-half";
      const spinParity = spinResult % 2 === 0 ? "even" : "odd";
  
      let pointsWon = 0;
      bets.forEach(bet => {
        if (bet.type === "number" && parseInt(bet.value) === spinResult) {
          pointsWon += 35;
        } else if (bet.type === "color" && bet.value === spinColor) {
          pointsWon += 1;
        } else if (bet.type === "range" && bet.value === spinRange) {
          pointsWon += 1;
        } else if (bet.type === "even" && bet.value === "even" && spinParity === "even") {
          pointsWon += 1;
        } else if (bet.type === "odd" && bet.value === "odd" && spinParity === "odd") {
          pointsWon += 1;
        }
      });
  
      points -= bets.length; // Each bet costs 1 point
      points += pointsWon;
  
      pointsDiv.textContent = `Body: ${points}`;
      resultDiv.innerHTML = `
        <p>Výsledek roztočení: <strong>${spinResult}</strong> (${spinColor})</p>
        <p>Bodů získáno: <strong>${pointsWon}</strong></p>
      `;
    });
  });
  