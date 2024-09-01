const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.innerText = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function updateComputerMove(computerMove) {
    const computerMoveDisplay = document.getElementById('computer-move');
    computerMoveDisplay.innerText = `Computer picked: ${computerMove}.`;
}

function updateScoreInLocalStorage() {
    localStorage.setItem('score', JSON.stringify(score));
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissor';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    if (playerMove === 'rock') {
        if (computerMove === 'rock') result = 'TIE';
        else if (computerMove === 'paper') result = 'You LOSE';
        else if (computerMove === 'scissor') result = 'You WIN';
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') result = 'You WIN';
        else if (computerMove === 'paper') result = 'TIE';
        else if (computerMove === 'scissor') result = 'You LOSE';
    } else if (playerMove === 'scissor') {
        if (computerMove === 'rock') result = 'You LOSE';
        else if (computerMove === 'paper') result = 'You WIN';
        else if (computerMove === 'scissor') result = 'TIE';
    }

    if (result === 'You WIN') score.wins += 1;
    else if (result === 'You LOSE') score.losses += 1;
    else if (result === 'TIE') score.ties += 1;

    updateScoreDisplay();
    updateComputerMove(computerMove);
    updateScoreInLocalStorage();
}

const rockBtn = document.querySelector('.rock-btn');
rockBtn.addEventListener('click', () => playGame('rock'));

const paperBtn = document.querySelector('.paper-btn');
paperBtn.addEventListener('click', () => playGame('paper'));

const scissorBtn = document.querySelector('.scissor-btn');
scissorBtn.addEventListener('click', () => playGame('scissor'));

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreDisplay();
    updateComputerMove('');
    updateScoreInLocalStorage();
});

updateScoreDisplay();
