// Score object stored in localStorage
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

// Function to update score display
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to determine computer's move
function getComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}

// Function to handle player move
function playerMove(playerChoice) {
    const computerChoice = getComputerMove();
    let result = '';

    if (playerChoice === computerChoice) {
        result = 'Tie!';
        score.ties++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You Win!';
        score.wins++;
    } else {
        result = 'You Lose!';
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You: <img src="/project/rock-paper-scissors/img/${playerChoice}-emoji.png" class="move-icon">
    Computer: <img src="/project/rock-paper-scissors/img/${computerChoice}-emoji.png" class="move-icon">`;

    updateScoreElement();
}

// Function to reset score
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}

// Function to auto-play the game
function autoPlay() {
    let autoPlayInterval = setInterval(() => {
        const moves = ['rock', 'paper', 'scissors'];
        playerMove(moves[Math.floor(Math.random() * moves.length)]);
    }, 1000);

    setTimeout(() => clearInterval(autoPlayInterval), 5000); // Stops auto-play after 5 seconds
}

updateScoreElement(); // Update score on page load
