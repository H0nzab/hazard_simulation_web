
let myStats = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10:0,
  11:0,
  12:0
}

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

function rollSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
  }
   
  function rollDice() {
    const die1 = document.getElementById("die1");
    const die2 = document.getElementById("die2");
    const disSum = document.getElementById("sum");
    
    const result1 = rollSingleDie();
    const result2 = rollSingleDie();
    
    const sum = result1 + result2;
    
    //dataset update
    myStats[sum] += 1;

    die1.innerHTML = `<i class="fa-solid fa-dice-${getDieFace(result1)}" style="font-size: 3.5rem"></i>`;
    die2.innerHTML = `<i class="fa-solid fa-dice-${getDieFace(result2)}" style="font-size: 3.5rem"></i>`;
    disSum.innerHTML = "Sum: " + sum;
    
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

  function rollDiceHundred(){
    for (let i = 0; i < 100; i++) {
      const result1 = rollSingleDie();
      const result2 = rollSingleDie();
      
      const sum = result1 + result2;
    
      myStats[sum] += 1;
    }    
    updateChart();
  }