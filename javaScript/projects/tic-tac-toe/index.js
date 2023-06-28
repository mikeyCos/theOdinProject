// module pattern
const ticTacToe = (function() {
    const gameboard = {
        //about spread syntax
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        gameboard: [...Array(3)].map(e => Array(3).fill(null)),
        // gameboard: [
        //     ['X', 'O', 'X'],
        //     ['O', 'X', 'X'],
        //     ['O', 'X', 'O'],
        // ],
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function() {
            this.main = document.querySelector('#main');
            this.boardElement = this.main.querySelectorAll('#gameboard ul li')
        },
        render: function() {
            this.gameboard.map((e) => {
                e.map((x, index, element) => {
                    console.log(x)
                })
            })

            console.log(this.gameboard.flat(1))
            //this works if the array is full
            this.gameboard.flat(1).map((e, index, element) => {
                this.boardElement[index].textContent = this.gameboard.flat(1)[index];
            })

            // this.gameboard.map(e => e.map(x => console.log(`Test: ${e.indexOf(x)}`), console.log(e.length)))
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
            if (this.counter % 2 === 0) {
                marker = 'X';
            } else {
                marker = 'O';
            }
            
            this.counter++;
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const elementIndex = Array.from(this.boardElement).indexOf(e.target);
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = marker;

                console.log(this.gameboard[row])
                console.log(`row: ${row}, col: ${col}`)
                console.log(`elementIndex: ${elementIndex}`)
                console.log(this.boardElement[elementIndex].textContent);

                e.target.removeEventListener('click', this.markboard);
                this.render()
            }
        },
        checkGameStatus: function() {
            
        },
    };

    gameboard.init();
    gameboard.render();
})();

// factory function
const Player = (score, maker) => {

}