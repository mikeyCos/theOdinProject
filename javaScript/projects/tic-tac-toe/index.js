// module pattern
const ticTacToe = (function() {
    //factory
    const player = (name, marker) => {
        let score = 0;
        const getName = () => name;
        const getMarker = () => marker;
        const win = () => {
            updateScore();
            return `${name} is the winner!`;
        }
        const updateScore = (x) => {
            return !x ? score += 1 : score = 0;
        }
        const updateName = (newName) => name = newName;
        return {updateName, getName, getMarker, win};
    }

    const players = {
        //if user selects 'Player Vs. Player'
            //display two inputs to set player name
        players: [player('Player One', 'X'), player('Player Two', 'O')],
        init: function() {
            // this.players = [...Array(2)];
            this.cacheDom();
            this.bindSelectEvents();
            let selection = this.selectElement.value;
            //this is if 'selected attribute is on pvp option
            if (!selection.includes('pvc')) {
                this.render();
            } else {
                this.players[1].updateName('Computer');
                // console.log(this.players[0])
            }
        },
        cacheDom: function() {
            this.selectWrapper = document.querySelector('.container-button.select');
            this.selectElement = document.querySelector('#select');
            this.inputWrapper = document.querySelector('.input-wrapper.input');
            this.inputs = document.querySelectorAll('.input-wrapper.input input');
        },
        bindInputs: function() {
            this.updateName = this.updateName.bind(this);
            this.inputs.forEach(input => input.addEventListener('input', this.updateName));
        },
        bindSelectEvents: function() {
            this.selectPlayer = this.selectPlayer.bind(this);
            this.selectElement.addEventListener('change', this.selectPlayer)
        },
        render: function() {
            //renders inputs to allow players to enter their names
            const wrapper = document.createElement('div');
            wrapper.classList.add('input-wrapper', 'input');
            for (i = 0; i < this.players.length; i++) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                this.setAttributes(i, label, input)
                wrapper.appendChild(label);
                wrapper.appendChild(input);
            }
            this.selectWrapper.appendChild(wrapper);
            this.cacheDom();
        },
        setAttributes: function(i, label, input) {
            //sets attributes for labels/inputs
            //sets text node for label
            let id = 'player-one';
            let text = 'Player One';
            let value = text;
            if (i === 1) {
                id = 'player-two';
                text = 'Player Two';
            }
            Object.assign(input, {
                id: id,
                name: id,
                type: 'text',
                pattern: '[A-Za-z]',
                placeholder: text,
                value: text,
            })
            label.setAttribute('for', id)
            const textNode = document.createTextNode(text);
            label.appendChild(textNode);
        },
        selectPlayer: function(e) {
            let selection = e.target.value;
            //if 'Player Vs. Player' is selected
                //render inputs to allow players to enter their names
                //add event listeners to inputs
                //the event listeners will add player objects to players[]
            //else run compter
                //remove event listeners from inputs
                //remove DOM input elements
                console.log(selection)
                gameController.reset();
                // gameboard.render();
            if (!selection.includes('pvc')) {
                this.render();
                this.bindInputs();
            } else {
                this.inputWrapper.remove();
                this.inputs.forEach(input => input.removeEventListener('input', this.updateName));
                this.players[1].updateName('Computer');
                //need to set this.players[1] to human
                //need to set this.players[2] to computer
            }
            
        },
        computer: function() {
            //computer randomly marks board
            console.log(this.players[1].getMarker())
            const event = new Event("build");
            const boardElements = gameboard.boardElements;
            // Listen for the event.
            boardElements.forEach(elem => elem.addEventListener("build", gameboard.markBoard));

            // Dispatch the event.
            // this.boardElements.forEach(elem => elem.dispatchEvent(event));
            let index = Math.floor(Math.random() * 8);
            //computer only marks if boardElements[index].textContent is empty
            while (boardElements[index].textContent !== '') {
                index = Math.floor(Math.random() * 8);
            }
            // console.log(boardElements[index].textContent)
            boardElements[index].dispatchEvent(event);
            // console.log(boardElements[index].textContent)
        },
        updateName: function(e) {
            //update player's name based on e.target.id
            let id = e.target.id;
            let newName = e.target.value;
            if (id === 'player-one') {
                players.players[0].updateName(newName);
            } else {
                players.players[1].updateName(newName);
            }
            console.log(players.players[0].getName())

        },
        selectMarker: function() {
            //person is always 'X' even if 'Player Vs. Computer' is selected

        },
    }

    const gameboard = {
        //about spread syntax
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        gameboard: [],
        init: function() {
            this.gameboard =  [...Array(3)].map(e => Array(3).fill(null));
            this.cacheDom();
            this.bindButtonEvents();
            this.bindBoardEvents();
        },
        cacheDom: function() {
            this.wrapperGameboard = document.querySelector('#gameboard');
            this.boardElements = document.querySelectorAll('#gameboard ul li button');
            this.buttonReset = document.querySelector('#reset');
        },
        bindBoardEvents: function() {
            //why does this work?
            this.markBoard = this.markBoard.bind(this);
            this.boardElements.forEach(btn => btn.addEventListener('click', this.markBoard));
        },
        bindButtonEvents: function() {
            reset = gameController.reset.bind(gameController);
            this.buttonReset.addEventListener('click', reset);
        },
        render: function() {
            console.log(this.gameboard.flat(1)); //for debugging
            //this works if the array is full
            this.gameboard.flat(1).forEach((e, index, element) => {
                this.boardElements[index].textContent = this.gameboard.flat(1)[index];
            });
        },
        markBoard: function(e) {
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const elementIndex = Array.from(this.boardElements).indexOf(e.target);
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = gameController.activePlayer.getMarker();
                e.target.removeEventListener('click', this.markBoard);
                this.render();
                gameController.checkGameStatus();
            }
        },
    }

    const gameController = {
        activePlayer: players.players[0],
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.activePlayer = this.activePlayer === players.players[0]?
            players.players[1] : players.players[0];
            //if this.activePlayer is computer
                //run the computer's functin to mark the board
            if (this.activePlayer.getName() === 'Computer') {
                players.computer();
            }
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
                    console.log(`Game is over`); //for debugging
                    console.log(this.activePlayer.win()); //for debugging
                } else {
                    console.log('Draw'); //for debugging
                }
                //remove event listeners from board
                gameboard.boardElements.forEach(btn => btn.removeEventListener('click', gameboard.markBoard));
                //need to display an element that congratulates the winning player
                this.render();
                return true;
            } else {
                this.switchTurns();
            }
        },
        cacheDom: function() {
            this.winnerMessage = document.querySelector('#winner-wrapper');
        },
        bindEvents: function() {
            this.reset = this.reset.bind(this);
            this.winnerMessage.addEventListener('click', this.reset);
        },
        render: function() {
            const wrapperWinner = document.createElement('div');
            wrapperWinner.id = 'winner-wrapper';
            const winnerMessage = document.createElement('p');
            const textNode = document.createTextNode(this.activePlayer.win());
            wrapperWinner.appendChild(winnerMessage);
            winnerMessage.appendChild(textNode);
            console.log(textNode); //for debugging
            console.log(wrapperWinner); //for debugging
            gameboard.wrapperGameboard.appendChild(wrapperWinner);
            this.cacheDom();
            this.bindEvents();
        },
        reset: function() {
            //if user clicks winning container OR restart button
                //empty gameboard[]
                //set activePlayer to players[0]
            this.activePlayer = players.players[0];
            if (this.winnerMessage) {
                this.winnerMessage.removeEventListener('click', this.reset);
                this.winnerMessage.remove()
            }
            gameboard.init();
            gameboard.render();
        },
    }

    gameboard.init();
    gameboard.render();
    players.init();
    // gameboard.computer();
    // players.computer();
})();