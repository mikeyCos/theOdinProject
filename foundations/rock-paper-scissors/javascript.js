function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
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
