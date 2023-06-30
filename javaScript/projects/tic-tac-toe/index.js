// module pattern
const ticTacToe = (function() {
    const gameboard = {
        //about spread syntax
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        gameboard: [...Array(3)].map(e => Array(3).fill(null)),
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function() {
            this.main = document.querySelector('#main');
            this.boardElement = this.main.querySelectorAll('#gameboard ul li')
            this.buttonReset = this.main.querySelector('.reset button');
        },
        render: function() {
            [...this.gameboard].map((e) => {
                console.log({...e})
            });

            console.log(this.gameboard.flat(1))
            //this works if the array is full
            this.gameboard.flat(1).forEach((e, index, element) => {
                this.boardElement[index].textContent = this.gameboard.flat(1)[index];
            })
        },
        bindEvents: function() {
            //why does this work?
            this.markboard = this.markboard.bind(this);
            this.boardElement.forEach(li => li.addEventListener('click', this.markboard));
        },
        counter: 0,
        markboard: function(e) {
            let marker;
            console.log(this.counter)
            this.counter % 2 === 0 ? marker = 'X' : marker = 'O';
            
            this.counter++;
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const elementIndex = Array.from(this.boardElement).indexOf(e.target);
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = marker;

                e.target.removeEventListener('click', this.markboard);
                this.render()
                console.log(this.checkGameStatus())
            }
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
                this.boardElement.forEach(li => li.removeEventListener('click', this.markboard));
                return true;
            }

            //horizontal
            // this.gameboard.map((rows, index) => { 
            //     rows.some((item, i, arr) => {
            //         if (item !== null && item === arr[i-2] && item === arr[i-1]) {
            //             console.log(true)
            //         }
            //     })
            // });
            
            //vertical
            // this.gameboard.map((rows, index) => {
            //     rows.some((item, i, arr) => {
            //         if (i > 1 && this.gameboard[i][index] !== null && this.gameboard[i][index] === this.gameboard[i-2][index] && this.gameboard[i][index] === this.gameboard[i-1][index]) {
            //             console.log(true)
            //         }
            //     })
            // });
            
            //diagonal
            //top left to bottom right
            // this.gameboard.map((rows, index) => {
            //     //top right 
            //     // console.log(rows[index+2])
            //     //bottom left
            //     // console.log(rows[index-2])
            //     rows.some((item, i, arr) => {
            //         if (index > 1 && i > 1 && ((
            //             this.gameboard[i][index] !== null && 
            //             this.gameboard[i-1][index-1] === this.gameboard[i][index] &&
            //             this.gameboard[i-2][index-2] === this.gameboard[i][index]
            //         ) || (
            //             this.gameboard[i][index-2] !== null &&
            //             this.gameboard[i-2][index] === this.gameboard[i][index-2] &&
            //             this.gameboard[i-1][index-1] === this.gameboard[i][index-2]
            //         ))) {
            //             console.log(true)
            //             // console.log(this.gameboard[i-1][index-1])
            //             // console.log(this.gameboard[i-2][index-2])
            //             // console.log(this.gameboard[i][index])

            //             // console.log(this.gameboard[i-2][index])
            //             // console.log(this.gameboard[i-1][index-1])
            //             // console.log(this.gameboard[i][index-2])
            //         }  
            //     })
            // });
        },
        reset: function() {
            //empty the gameboard[]
        },

    };

    gameboard.init();
    gameboard.render();
})();

// factory function
const player = (name, score, marker) => {
    const win = () => {
        console.log(`${name} has won!`)
    }
    const getName = () => name;
    const getScore = () => score;
    const getMarker = () => marker;

    return {getName, getScore, getMarker, win};
}

