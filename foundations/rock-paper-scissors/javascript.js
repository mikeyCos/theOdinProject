// 06 MAR 2023
// 14 MAR 2023
let playerChoice = prompt('enter rock, paper or scissors');
playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1, playerChoice.length).toLowerCase();

function getComputerChoice(callBack) {
    // debugger;
    let randomNumber = Math.floor(Math.random() * 3);
    let computerChoice;
    if (randomNumber === 0) {
        computerChoice = 'Rock'; // if number is = 0, then computer chooses rock
    } else if (randomNumber === 1) {
        computerChoice = 'Paper';// if number is = 1, then computer chooses paper
    } else {
        computerChoice = 'Scissors'; // if number is = 2, then computer chooses scissors
    }
    playRound(playerChoice, computerChoice);
}

// function for 1 game of rock-paper-scissors
// function takes 2 parameters, playerSelection and computerSelection
function playRound(player, computer) {
        debugger;
        if ((player === 'Rock') && (computer === 'Paper') || (player === 'Paper') && (computer === 'Scissors') || (player === 'Scissors') && (computer === 'Rock')) {
            console.log(`You lose`);
        } else if ((player === 'Paper') && (player === 'Rock') || (player === 'Scissors') && (computer === 'Paper') || (player === 'Rock') && (computer === 'Scissors')) {
            console.log(`You win`);
        } else {
            console.log(`Tie game`);
        }
}

getComputerChoice(playRound);