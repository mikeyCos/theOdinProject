// 06 MAR 2023
// This article helped me divide the addEventListener and a named function instead of using an anonymous function.
// https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b

// define computer score
let computerScore = 0;
// define player score
let playerScore = 0;
// initialize nodes for player and computer scores
let playerScoreNode = document.querySelector('.player');
let computerScoreNode = document.querySelector('.computer');
// initialized nodes for showing who won current round/game
let results = document.querySelector('.results');

let buttons = document.getElementById('btn-container');
buttons.addEventListener('click', getPlayerChoice, true);

function getPlayerChoice(e) {
    let playerChoice = e.target.className;
    playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1, playerChoice.length);
    checkWinner(playerChoice);
}

// get computer choice
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

// check winner
// if player wins, increment score by 1
// if computer wins, increment score by 1
// display who won the round
function checkWinner(playerChoice) {
    let computerChoice = getComputerChoice();
    console.log('playerChoice: ' + playerChoice); // for debugging
    console.log('computerChoice: ' + computerChoice); // for debugging
    if ((playerChoice == 'Rock' && computerChoice == 'Scissors') || (playerChoice == 'Paper' && computerChoice == 'Rock') || (playerChoice == 'Scissors' && computerChoice == 'Paper')) {
        console.log('Player wins round!');
        playerScore++;
        results.textContent = 'Player wins round!';
    } else if ((computerChoice == 'Rock' && playerChoice == 'Scissors') || (computerChoice == 'Paper' && playerChoice == 'Rock') || ( computerChoice == 'Scissors' && playerChoice == 'Paper')) {
        console.log('Computer wins round!');
        computerScore++;
        results.textContent = 'Computer wins round!';
    } else {
        console.log('Tie round!');
        results.textContent = 'Tie round!';
    }
    checkScore();
}

// check score
// determines who wins the game at X amount of rounds
// removes event listener(s)
// display current score
function checkScore() {
    playerScoreNode.textContent = `You: ${playerScore}`;
    computerScoreNode.textContent = `Computer: ${computerScore}`;
    if (playerScore == 5 || computerScore == 5) {
        buttons.removeEventListener('click', getPlayerChoice, true);
        if (playerScore == 5) {
            console.log(`🙂 Player wins the game! 🙂`);
            results.textContent = 'Player wins the game! ';
        } else {
            console.log(`Computer wins the game!`);
            results.textContent = '😥 Computer wins the game! 😥';
        }
    }
}

// reset game
// turn buttons back on
// 