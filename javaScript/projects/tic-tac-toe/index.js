// module pattern
const ticTacToe = (function() {
    //factory
    const player = (name, marker) => {
        let score = 0;
        const getName = () => name;
        const getMarker = () => marker;
        const win = () => {
            console.log(`${name} has won!`)
        }
        const updateScore = (x) => {
            return !x ? score += 1 : score = 0;
        }
        return {updateScore, getName, getMarker, win};
    }

    const players = [
        player('Jack', 'X'),
        player('Pam', 'O'),
    ]

    const gameboard = {
        //about spread syntax
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        gameboard: [...Array(3)].map(e => Array(3).fill(null)),
        activePlayer: players[0],
        init: function() {
            this.cacheDom();
            this.bindButtonEvents();
            this.bindBoardEvents();
        },
        cacheDom: function() {
            this.main = document.querySelector('#main');
            this.boardElement = this.main.querySelectorAll('#gameboard ul li')
            this.buttonReset = this.main.querySelector('.reset button');
        },
        render: function() {
            //for debugging
            [...this.gameboard].map((e) => {
                console.log({...e})
            });

            console.log(this.gameboard.flat(1))
            //this works if the array is full
            this.gameboard.flat(1).forEach((e, index, element) => {
                this.boardElement[index].textContent = this.gameboard.flat(1)[index];
            })
        },
        bindBoardEvents: function() {
            //why does this work?
            this.markBoard = this.markBoard.bind(this);
            this.boardElement.forEach(li => li.addEventListener('click', this.markBoard));
        },
        bindButtonEvents: function() {
            this.reset = this.reset.bind(this);
            this.buttonReset.addEventListener('click', this.reset)
        },
        markBoard: function(e) {
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const elementIndex = Array.from(this.boardElement).indexOf(e.target);
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = this.activePlayer.getMarker();

                e.target.removeEventListener('click', this.markBoard);
                this.render()
                this.switchTurns();
                console.log(this.checkGameStatus())
            }
        },
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.activePlayer = this.activePlayer === players[0] ? players[1] : players[0];
        },
        checkGameStatus: function() {
            let gameOver;
            this.gameboard.map((rows, index) => { 
                rows.some((item, i, arr) => {
                    if (item !== null && item === arr[i-2] && item === arr[i-1]) {
                        //horizontal check
                        gameOver = true;
                    } else if (i > 1 && 
                        this.gameboard[i][index] !== null &&
                        this.gameboard[i][index] === this.gameboard[i-2][index] &&
                        this.gameboard[i][index] === this.gameboard[i-1][index]) {
                        //vertical check
                        gameOver = true;
                    } else if (index > 1 && i > 1 && (
                        (this.gameboard[i][index] !== null && 
                        this.gameboard[i-1][index-1] === this.gameboard[i][index] &&
                        this.gameboard[i-2][index-2] === this.gameboard[i][index]) 
                        ||
                        (this.gameboard[i][index-2] !== null &&
                        this.gameboard[i-2][index] === this.gameboard[i][index-2] &&
                        this.gameboard[i-1][index-1] === this.gameboard[i][index-2]))) {
                        //diagonal check
                        gameOver = true;
                    }
                })
            });

            if (gameOver || this.gameboard.flat(1).every(e => e !== null)) {
                if (gameOver) {
                    console.log(`Game is over`)
                } else {
                    console.log('Draw')
                }
                //need to display an eement that congratulates the winning player
                this.boardElement.forEach(li => li.removeEventListener('click', this.markBoard));
                this.reset()
                return true;
            }
        },
        reset: function() {
            //if user clicks winning container OR restart button
                //empty gameboard[]
                //set activePlayer to players[0]
            this.gameboard = [...Array(3)].map(e => Array(3).fill(null))
            this.activePlayer = players[0];
            this.render()
            this.bindBoardEvents();
        },
    };

    gameboard.init();
    gameboard.render();
})();

const buttonReset = document.querySelector('#reset')