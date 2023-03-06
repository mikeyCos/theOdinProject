let playerSelection;
let computerSelection;
console.log(playerSelection);

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return 'Rock'; // if number is = 0, then computer chooses rock
    } else if (randomNumber === 1) {
        return 'Paper'; // if number is = 1, then computer chooses paper
    } else {
        return 'Scissors'; // if number is = 2, then computer chooses scissors
    }
}

// function for 1 game of rock-paper-scissors
// function takes 2 parameters, playerSelection and computerSelection
    // if player loses return "You Lose! ${computerSelection} beats ${playerSelection}"
    // if computer loses return "You Win! ${playerSelection beats ${computerSelection}"
    // if playerSelection === computerSelection, return "Tie game"
function playRound(playerSelection, computerSelection) {
        // console.log('playerSelection: ' + playerSelection); //  For debugging purposes only
        // console.log('computerSelection: ' + computerSelection); //  For debugging purposes only
        // playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1, playerSelection.length).toLowerCase();
        computerSelection = computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1, computerSelection.length).toLowerCase();
        if ((playerSelection === 'Rock') && (computerSelection === 'Paper') || (playerSelection === 'Paper') && (computerSelection === 'Scissors') || (playerSelection === 'Scissors') && (computerSelection === 'Rock')) {
            return `You Lose! ${computerSelection} beats ${playerSelection}`;
        } else if ((playerSelection === 'Paper') && (computerSelection === 'Rock') || (playerSelection === 'Scissors') && (computerSelection === 'Paper') || (playerSelection === 'Rock') && (computerSelection === 'Scissors')) {
            return `You Win! ${playerSelection} beats ${computerSelection}`;
        } else {
            return `Tie game`;
        }
}

// function that plays 5 rounds
function playGame() {
    for(i = 1; i <= 5; i++) {
        playerSelection = prompt("Please enter your selection.");
        playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1, playerSelection.length).toLowerCase();
        while (playerSelection !== 'Rock' && playerSelection !== 'Paper' && playerSelection !== 'Scissors') {
            playerSelection = prompt("Type in either 'rock', 'paper', or 'scissors'.");
            playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1, playerSelection.length).toLowerCase();
        }

        computerSelection = getComputerChoice();
        console.log('This is round ' + i + '\n' + playRound(playerSelection, computerSelection));
        if (i === 5) {
            console.log('Game completed.');
        }
    }
}

console.log(playGame());