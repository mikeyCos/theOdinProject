// Started: 06 MAR 2023
// Finished: 17 MAR 2023
// This article helped me divide the addEventListener and a named function instead of using an anonymous function.
// https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b

let computerScore = 0;
let playerScore = 0;
let playerScoreNode = document.querySelector('.player');
let computerScoreNode = document.querySelector('.computer');
let results = document.querySelector('.results');
let buttons = document.getElementById('btn-container');
let resetButton = document.getElementById('btn-reset');
resetButton.addEventListener('click', reset, true);

// get user input
let roundsForm = document.getElementById('enter-rounds');
roundsForm.addEventListener('submit', getRounds);

let roundsCounter = 0;
let rounds = 0;

function turnOn() {
    buttons.addEventListener('click', getPlayerChoice, true);
}

function getPlayerChoice(e) {
    let playerChoice = e.target.className;
    playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1, playerChoice.length);
    checkWinner(playerChoice);
}

function getComputerChoice() {
    let number = Math.floor((Math.random() * 3));
    if (number == 0) {
        return 'Rock';
    } else if (number == 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function checkWinner(playerChoice) {
    let computerChoice = getComputerChoice();
    roundsCounter++
    if ((playerChoice == 'Rock' && computerChoice == 'Scissors') || (playerChoice == 'Paper' && computerChoice == 'Rock') || (playerChoice == 'Scissors' && computerChoice == 'Paper')) {
        playerScore++;
        results.textContent = `Round ${roundsCounter}: Player wins round!`;
    } else if ((computerChoice == 'Rock' && playerChoice == 'Scissors') || (computerChoice == 'Paper' && playerChoice == 'Rock') || ( computerChoice == 'Scissors' && playerChoice == 'Paper')) {
        computerScore++;
        results.textContent = `Round ${roundsCounter}: Computer wins round!`;
    } else {
        results.textContent = `Round: ${roundsCounter}: Tie round!`;
    }
    checkScore(rounds);
}

function checkScore() {
    playerScoreNode.textContent = `You: ${playerScore}`;
    computerScoreNode.textContent = `Computer: ${computerScore}`;
    if (roundsCounter == rounds) {
        buttons.removeEventListener('click', getPlayerChoice, true);
        rounds = 0;
        if (playerScore > computerScore) {
            results.textContent = 'Player wins the game! ';
        } else if (playerScore < computerScore) {
            results.textContent = '😥 Computer wins the game! 😥';
        } else if (playerScore == computerScore) {
            results.textContent = 'Tie game';
        }
    }
}   

// takes user input for how many rounds they want to play
function getRounds (e) {
    e.preventDefault();
    rounds = document.getElementById('rounds').value;
    checkScore();
    turnOn();
}

function reset() {
    turnOn();
    playerScore = 0;
    computerScore = 0;
    roundsCounter = 0;
    checkScore();
    results.textContent = '';
}