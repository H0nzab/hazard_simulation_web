const reelSymbols = [   ['🍒', '🍒', '🍒', '🍒', '🍒', '🍒', '🔔', '🔔', '🔔', '🍋', '🍋', '🍋', '⭐', '⭐', '⭐', '🍉', '🍉', '🍉', '7️⃣', 'BAR'],
                        ['🍉', '🍉', '🍉', '🍊', '🍊', '🍊', '🍋', '🍋', '🍋', '🍓', '🍓', '🍓', '7️⃣', '7️⃣', '7️⃣', 'BAR', 'BAR', 'BAR', '🍇', '⭐'], 
                        ['BAR', 'BAR', 'BAR', '🔔', '🔔', '🔔', '🍇', '🍇', '🍇', '🍓', '🍓', '🍓', '🍊', '🍊', '🍊', '🍉', '🍉', '🍉', '🍋', '🍒'] ];

const winCombinations = { 
    '🍒 🍒 🍒': 10, 
    '🔔 🔔 🔔': 10, 
    '🍋 🍋 🍋': 10, 
    '⭐ ⭐ ⭐': 10, 
    '🍉 🍉 🍉': 10, 
    '🍊 🍊 🍊': 50, 
    '🍓 🍓 🍓': 50, 
    '7️⃣ 7️⃣ 7️⃣': 100, 
    'BAR BAR BAR': 100};

let accountBalance = 500;
function spin() { 

    if (accountBalance < 10) 
        { 
            alert('Nemáte dostatek kreditů pro další hru.'); 
            return; 
        } 

    accountBalance -= 10; 

    const result = reelSymbols.map(reel => { 
        const randomIndex = Math.floor(Math.random() * reel.length); 
        return reel[randomIndex]; 
    }); 

    const resultText = result.join(' '); 
    const winPoints = winCombinations[resultText] || 0; 
    accountBalance += winPoints; 
    
    document.getElementById('result').innerText = `${resultText} \nVýhra: ${winPoints} bodů`; 
    document.getElementById('account').innerText = `Stav účtu: ${accountBalance}`; }