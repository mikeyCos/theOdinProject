// 06 MAR 2023
// 14 MAR 2023
const buttons = document.querySelectorAll('button');
let computerChoice;
let playerChoice;
const results = document.querySelector('.results');

function getPlayerChoice() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playerChoice = button.className;
            playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1, playerChoice.length).toLowerCase();
        });
    });
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    computerChoice = 'Scissors';
    if (randomNumber === 0) {
        computerChoice = 'Rock'; // if number is = 0, then computer chooses rock
        // console.log(computerChoice);
    } else if (randomNumber === 1) {
        computerChoice = 'Paper';// if number is = 1, then computer chooses paper
        // console.log(computerChoice);
    } 
}

function playRound(player, computer) { 
        let resultsText;
        if ((player === 'Rock') && (computer === 'Paper') || (player === 'Paper') && (computer === 'Scissors') || (player === 'Scissors') && (computer === 'Rock')) {
            console.log(`You lose`);
            resultsText = document.createTextNode('You lose');
            results.appendChild(resultsText);
        } else if ((player === 'Paper') && (computer === 'Rock') || (player === 'Scissors') && (computer === 'Paper') || (player === 'Rock') && (computer === 'Scissors')) {
            console.log(`You win`);
            resultsText = document.createTextNode('You win');
            results.appendChild(resultsText);
        } else if ((player === 'Paper') && (computer === 'Paper') || (player === 'Rock') && (computer === 'Rock') || (player === 'Scissors') && (computer === 'Scissors')) {
            console.log(`Tie game`);
            resultsText = document.createTextNode('Tie game');
            results.appendChild(resultsText);
        }
}

getPlayerChoice();