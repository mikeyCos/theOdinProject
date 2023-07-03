// module pattern
const ticTacToe = (function() {
    //factory
    const player = (name, marker) => {
        let score = 0;
        const getName = () => name;
        const getMarker = () => marker;
        const win = () => {
            updateScore();
            // console.log(`${name} has won!`)
            return `${name} has won!`;
        }
        const updateScore = (x) => {
            return !x ? score += 1 : score = 0;
        }
        return {updateScore, getName, getMarker, win};
    }

    const players = {
        //if user selects 'Player Vs. Player'
            //display two inputs to set player name
        players: [player('Jack', 'X'), player('Pam', 'O')],
        init: function() {
            this.cacheDom();
        },
        cacheDom: function() {
            this.selectElement = document.querySelector('#select');
        },
        bindEvents: function() {

        },
        render: function() {
            const wrapper = document.createElement('')
        }
    }

    // players.players[0].win()
    // players.players[0].updateScore()
    // console.log(players.players[0].updateScore())
    // console.log(players.players[0].updateScore(true))
    // console.log(players.players[0].updateScore())

    const gameboard = {
        //about spread syntax
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        gameboard: [...Array(3)].map(e => Array(3).fill(null)),
        init: function() {
            this.cacheDom();
            this.bindButtonEvents();
            this.bindBoardEvents();
        },
        cacheDom: function() {
            this.wrapperGameboard = document.querySelector('#gameboard');
            this.boardElement = document.querySelectorAll('#gameboard ul li button');
            this.buttonReset = document.querySelector('#reset');
        },
        bindBoardEvents: function() {
            //why does this work?
            this.markBoard = this.markBoard.bind(this);
            this.boardElement.forEach(btn => btn.addEventListener('click', this.markBoard));
        },
        bindButtonEvents: function() {
            reset = gameController.reset.bind(gameController);
            this.buttonReset.addEventListener('click', reset)
        },
        render: function() {
            console.log(this.gameboard.flat(1))
            //this works if the array is full
            this.gameboard.flat(1).forEach((e, index, element) => {
                this.boardElement[index].textContent = this.gameboard.flat(1)[index];
            })

            //if gameController.checkGameStatus() returns true
                //create wrapper element
                //append gameController.activePlayer.win()
            // if (gameController.checkGameStatus()) {
            //     console.log(`game over`)
            // }
        },
        markBoard: function(e) {
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const elementIndex = Array.from(this.boardElement).indexOf(e.target);
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = gameController.activePlayer.getMarker();
                e.target.removeEventListener('click', this.markBoard);
                this.render();
                gameController.checkGameStatus();
                // console.log(gameController.checkGameStatus())
                // gameController.switchTurns()
            }
        }
    };

    const gameController = {
        activePlayer: players.players[0],
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.activePlayer = this.activePlayer === players.players[0] ? players.players[1] : players.players[0];
        },
        checkGameStatus: function() {
            const board = gameboard.gameboard;
            let gameOver;
            board.map((rows, index) => { 
                rows.some((item, i, arr) => {
                    if (item !== null && item === arr[i-2] && item === arr[i-1]) {
                        //horizontal check
                        gameOver = true;
                    } else if (i > 1 && 
                        board[i][index] !== null &&
                        board[i][index] === board[i-2][index] &&
                        board[i][index] === board[i-1][index]) {
                        //vertical check
                        gameOver = true;
                    } else if (index > 1 && i > 1 && (
                        (board[i][index] !== null && 
                        board[i-1][index-1] === board[i][index] &&
                        board[i-2][index-2] === board[i][index]) 
                        ||
                        (board[i][index-2] !== null &&
                        board[i-2][index] === board[i][index-2] &&
                        board[i-1][index-1] === board[i][index-2]))) {
                        //diagonal check
                        gameOver = true;
                    }
                })
            });

            if (gameOver || board.flat(1).every(e => e !== null)) {
                if (gameOver) {
                    console.log(`Game is over`);
                    console.log(this.activePlayer.win());
                } else {
                    console.log('Draw')
                }
                //need to display an element that congratulates the winning player
                gameboard.boardElement.forEach(btn => btn.removeEventListener('click', gameboard.markBoard));
                this.render()
                // this.reset()
                return true;
            } else {
                this.switchTurns();
            }
        },
        cacheDom: function() {
            this.winnerMessage = document.querySelector('#winner-wrapper');
        },
        bindEvents: function() {
            this.cacheDom();
            this.reset = this.reset.bind(this);
            this.winnerMessage.addEventListener('click', this.reset);
            console.log(this)
            // console.log(document.querySelector('#winner-wrapper'))
            // document.querySelector('#winner-wrapper')
        },
        render: function() {
            const wrapperWinner = document.createElement('div');
            wrapperWinner.id = 'winner-wrapper';
            const winnerMessage = document.createElement('p');
            const textWinner = document.createTextNode(this.activePlayer.win());
            wrapperWinner.appendChild(winnerMessage);
            winnerMessage.appendChild(textWinner);
            console.log(textWinner)

            console.log(wrapperWinner)
            gameboard.wrapperGameboard.appendChild(wrapperWinner);
            this.bindEvents()
        },
        reset: function() {
            //if user clicks winning container OR restart button
                //empty gameboard[]
                //set activePlayer to players[0]
            gameboard.gameboard = [...Array(3)].map(e => Array(3).fill(null));
            this.activePlayer = players.players[0];
            this.winnerMessage.removeEventListener('click', this.reset);
            this.winnerMessage.remove();
            gameboard.render();
            gameboard.bindBoardEvents();
        },
    }

    gameboard.init();
    gameboard.render();
    players.init();
})();