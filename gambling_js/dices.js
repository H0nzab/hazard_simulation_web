let myStats = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
let balance = 5000;
let currentBet = null; // 'pass', 'dontPass', 'come', 'dontCome'
let point = null; // point - target
let isBettingResolved = false;
let myChart;

function initialize() {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(myStats),
            datasets: [{
                label: '# of Occurrences',
                data: Object.values(myStats),
                borderWidth: 1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            return `Occurrences: ${value}`;
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

initialize();

function selectBet(betType) {
    if (isBettingResolved) return;

    const betButtons = document.querySelectorAll(".bet-button");
    betButtons.forEach(btn => btn.classList.remove("selected"));

    if (betType === "pass" || betType === "dontPass") {
        document.getElementById(`${betType}LineBtn`).classList.add("selected");
        currentBet = betType;
    } else if ((betType === "come" || betType === "dontCome") && point !== null) {
        document.getElementById(`${betType}Btn`).classList.add("selected");
        currentBet = betType;
    }

    document.getElementById("gameStatus").innerText = `Bet placed: ${betType.replace(/([A-Z])/g, ' $1')}`;
}

function rollSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
    if (!currentBet) {
        alert("Please select a bet before rolling the dice.");
        return;
    }
    const die1 = document.getElementById("die1");
    const die2 = document.getElementById("die2");
    const disSum = document.getElementById("sum");

    const result1 = rollSingleDie();
    const result2 = rollSingleDie();
    const sum = result1 + result2;

    // dataset update
    myStats[sum] += 1;

    die1.innerHTML = `<i class="fa-solid fa-dice-${getDieFace(result1)}" style="font-size: 3.5rem"></i>`;
    die2.innerHTML = `<i class="fa-solid fa-dice-${getDieFace(result2)}" style="font-size: 3.5rem"></i>`;
    disSum.innerHTML = `Sum: ${sum}`;
    resolveBet(sum);

    die1.classList.add("roll");
    die2.classList.add("roll");

    setTimeout(() => {
        die1.classList.remove("roll");
        die2.classList.remove("roll");
    }, 500);

    updateChart();
}

function updateChart() {
    myChart.data.datasets[0].data = Object.values(myStats);
    myChart.update();
}

function getDieFace(value) {
    const faces = ["one", "two", "three", "four", "five", "six"];
    return faces[value - 1];
}

function rollDiceHundred() {
    for (let i = 0; i < 100; i++) {
        const result1 = rollSingleDie();
        const result2 = rollSingleDie();
        const sum = result1 + result2;
        myStats[sum] += 1;
    }
    updateChart();
}

function rollDiceThousand() {
    for (let i = 0; i < 1000; i++) {
        const result1 = rollSingleDie();
        const result2 = rollSingleDie();
        const sum = result1 + result2;
        myStats[sum] += 1;
    }
    updateChart();
}

function resolveBet(sum) {
    const status = document.getElementById("gameStatus");
    if (currentBet === "pass" || currentBet === "come") {
        if (point === null) {
            // Come-out roll
            if (sum === 7 || sum === 11) {
                balance += 100; // Win
                status.innerText = `You won the ${currentBet === "pass" ? "Pass Line" : "Come"} bet!`;
                resetGame();
            } else if (sum === 2 || sum === 3 || sum === 12) {
                balance -= 100; // Loss
                status.innerText = `You lost the ${currentBet === "pass" ? "Pass Line" : "Come"} bet!`;
                resetGame();
            } else {
                point = sum;
                status.innerText = `Point is now set to ${point}. Roll again!`;
            }
        } else {
            // Point roll
            if (sum === point) {
                balance += 100; // Win
                status.innerText = `You hit the point and won the ${currentBet === "pass" ? "Pass Line" : "Come"} bet!`;
                resetGame();
            } else if (sum === 7) {
                balance -= 100; // Loss
                status.innerText = `You rolled a 7 and lost the ${currentBet === "pass" ? "Pass Line" : "Come"} bet!`;
                resetGame();
            }
        }
    } else if (currentBet === "dontPass" || currentBet === "dontCome") {
        if (point === null) {
            // Come-out roll
            if (sum === 2 || sum === 3) {
                balance += 100; // Win
                status.innerText = `You won the ${currentBet === "dontPass" ? "Don't Pass Line" : "Don't Come"} bet!`;
                resetGame();
            } else if (sum === 7 || sum === 11) {
                balance -= 100; // Loss
                status.innerText = `You lost the ${currentBet === "dontPass" ? "Don't Pass Line" : "Don't Come"} bet!`;
                resetGame();
            } else {
                point = sum;
                status.innerText = `Point is now set to ${point}. Roll again!`;
            }
        } else {
            // Point roll
            if (sum === 7) {
                balance += 100; // Win
                status.innerText = `You rolled a 7 and won the ${currentBet === "dontPass" ? "Don't Pass Line" : "Don't Come"} bet!`;
                resetGame();
            } else if (sum === point) {
                balance -= 100; // Loss
                status.innerText = `You hit the point and lost the ${currentBet === "dontPass" ? "Don't Pass Line" : "Don't Come"} bet!`;
                resetGame();
            }
        }
    }

    // Update balance
    document.getElementById("balance").innerText = balance;
}

// Reset game state
function resetGame() {
    point = null;
    currentBet = null;
    isBettingResolved = false;

    const betButtons = document.querySelectorAll(".bet-button");
    betButtons.forEach(btn => btn.classList.remove("selected"));

    document.getElementById("passLineBtn").disabled = false;
    document.getElementById("dontPassLineBtn").disabled = false;
    document.getElementById("comeBtn").disabled = true;
    document.getElementById("dontComeBtn").disabled = true;
}
