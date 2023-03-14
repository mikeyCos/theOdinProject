// 06 MAR 2023
// 14 MAR 2023
let computerChoice;
let playerChoice;

const buttons = document.querySelectorAll('button');
let results = document.querySelector('.results');
let resultsText = document.createTextNode('');
let playerScoreContainer = document.querySelector('.player');
let computerScoreContainer = document.querySelector('.computer');
let playerDisplayScore = document.createTextNode('0');
let computerDisplayScore = document.createTextNode('0');
let playerScore = 0;
let computerScore = 0;



function getPlayerChoice(callBack) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            playerChoice = button.className;
            playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1, playerChoice.length).toLowerCase();
            console.log(playerChoice);
            getComputerChoice();
            callBack(playerChoice, computerChoice);
            results.appendChild(resultsText);
            computerScoreContainer.appendChild(computerDisplayScore);
            playerScoreContainer.appendChild(playerDisplayScore);
        });
    });
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    computerChoice = 'Scissors';
    if (randomNumber === 0) {
        computerChoice = 'Rock'; // if number is = 0, then computer chooses rock
    } else if (randomNumber === 1) {
        computerChoice = 'Paper';// if number is = 1, then computer chooses paper
    } 
}

function playRound(player, computer) { 
        // let resultsText = document.createTextNode('');
        if ((player === 'Rock') && (computer === 'Paper') || (player === 'Paper') && (computer === 'Scissors') || (player === 'Scissors') && (computer === 'Rock')) {
            console.log(`You lose`); // for debugging
            computerScore++;
            computerDisplayScore.nodeValue = computerScore;
            resultsText.nodeValue = 'You lose';
        } else if ((player === 'Paper') && (computer === 'Rock') || (player === 'Scissors') && (computer === 'Paper') || (player === 'Rock') && (computer === 'Scissors')) {
            console.log(`You win`); // for debugging
            playerScore++;
            playerDisplayScore.nodeValue = playerScore;
            resultsText.nodeValue = 'You win';
        } else if ((player === 'Paper') && (computer === 'Paper') || (player === 'Rock') && (computer === 'Rock') || (player === 'Scissors') && (computer === 'Scissors')) {
            console.log(`Tie game`); // for debugging
            resultsText.nodeValue = 'Tie game';
        }
}

function checkWinner() {
    if (playerScore == 5) {
        // 'You are the winner!'
        // removeEventListener
    } else if (computerScore == 5) {
        // 'The Computer is the winner!'
        // removeEventListener
    }
}

// add a reset game

getPlayerChoice(playRound);