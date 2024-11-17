//const { Chart } = await import('chart.js');

myStats = {
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

function initialize(){
  const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(myStats),
                datasets: [{
                    label: '# of Occurrences',
                    data: Object.values(myStats),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
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

  myStats[sum].push(1);
  console.log(myStats);
  
  die1.innerHTML = result1;
  die2.innerHTML = result2;
  disSum.innerHTML = "Sum: " + sum;
  // add animation class
  
  die1.classList.add("roll");
  die2.classList.add("roll");
  
  setTimeout(() => {
    die1.classList.remove("roll");
    die2.classList.remove("roll");
  }, 500);
  
  // Remove animation class
  die1.classList.remove("roll");
  die2.classList.remove("roll");
  
  // Trigger reflow
  void die1.offsetWidth;
  void die2.offsetWidth;
  
  // Add animation class
  die1.classList.add("roll");
  die2.classList.add("roll");

    updateChart();
  }
  function updateChart() {
    myChart.data.datasets[0].data = Object.values(myStats);
    myChart.update();
}