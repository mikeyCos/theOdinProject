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
                gameController.reset();
            if (!selection.includes('pvc')) {
                this.render();
                this.bindInputs();
                this.players[1].updateName('Player Two');
            } else {
                this.inputWrapper.remove();
                this.inputs.forEach(input => input.removeEventListener('input', this.updateName));
                this.players[1].updateName('Computer');
            }
        },
        updateName: function(e) {
            //update player's name based on e.target.id
            let id = e.target.id;
            let newName = e.target.value;
            if (id === 'player-one') {
                console.log(players.players[0].getName())
                players.players[0].updateName(newName);
                console.log(players.players[0].getName())
            } else {
                console.log(players.players[1].getName())
                players.players[1].updateName(newName);
                console.log(players.players[1].getName())
            }
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
            this.boardSpanElements = document.querySelectorAll('#gameboard ul li button span');
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
            this.gameboard.forEach(e => {
                console.log(e)
            })
            console.log(`---`) //for debugging
            // console.log(this.gameboard[0]); //for debugging
            //this works if the array is full
            this.gameboard.flat(1).forEach((e, index) => {
                this.boardElements[index].textContent = this.gameboard.flat(1)[index];
            });
        },
        markBoard: function(e) {
            // if e.target textContent is empty
                //update this.gameboard and remove event listener
            if (!e.target.textContent) {
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                this.gameboard[row][col] = gameController.activePlayer.getMarker();
                e.target.removeEventListener('click', this.markBoard);
                this.render();
                gameController.setGameStatus();
            }
        },
    }

    const gameController = {
        activePlayer: players.players[0],
        gameState: null,
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.activePlayer = this.activePlayer === players.players[0]?
            players.players[1] : players.players[0];
            if (this.activePlayer.getName() === 'Computer') {
                computer.computer();
            }
        },
        getGameState: function(board) {
            // const board = gameboard.gameboard;
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
                });
            });

            if (gameOver || board.flat(1).every(e => e !== null)) {
                if (gameOver) {
                    return this.activePlayer.getMarker() === 'X' ? 1 : -1;
                } else {
                    return 0;
                }
                // return gameOver ? this.activePlayer.getMarker() === 'X' ? 1 : -1 : 0;
            }
            return null;
        },
        setGameStatus: function (state, board) {
            this.gameState = this.getGameState(gameboard.gameboard);
            console.log(`gameState: ${this.gameState}`) //for debugging
            if (this.gameState !== null) {
                let gameMessage;
                if (this.gameState === 1 || this.gameState === -1) {
                    gameMessage = this.activePlayer.win();
                } else {
                    gameMessage = 'Draw';
                }
                this.render(gameMessage);
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
        render: function(message) {
            const wrapperWinner = document.createElement('div');
            wrapperWinner.id = 'winner-wrapper';
            const winnerMessage = document.createElement('p');
            const textNode = document.createTextNode(message);
            wrapperWinner.appendChild(winnerMessage);
            winnerMessage.appendChild(textNode);
            console.log(textNode); //for debugging
            console.log(wrapperWinner); //for debugging
            gameboard.wrapperGameboard.appendChild(wrapperWinner);
            this.cacheDom();
            this.bindEvents();
        },
        reset: function() {
            this.activePlayer = players.players[0];
            this.gameState = null;
            if (this.winnerMessage) {
                this.winnerMessage.removeEventListener('click', this.reset);
                this.winnerMessage.remove()
            }
            gameboard.init();
            gameboard.render();
        },
    }

    const computer = {
        fauxBoard: null,
        fauxPlayer: gameController.activePlayer,
        computer: function() {
            //deep clone
            this.fauxBoard = JSON.parse(JSON.stringify(gameboard.gameboard))
            const event = new Event("build");
            const boardElements = gameboard.boardElements;
            boardElements.forEach(elem => elem.addEventListener('build', gameboard.markBoard));
            
            //computer randomly marks board
            // let index = Math.floor(Math.random() * 8);
            //computer only marks if boardElements[index].textContent is empty
            // while (boardElements[index].textContent !== '') {
            //     index = Math.floor(Math.random() * 8);
            // }
            console.log(`----------minimax running------------`)
            let test = this.minimax(gameController.getGameState(this.fauxBoard))
            // gameboard.gameboard = JSON.parse(JSON.stringify(this.fauxBoard))
            // console.log(this.minimax(gameController.getGameState(this.fauxBoard)))
            // gameboard.gameboard = test;
            // console.table(gameboard.gameboard)

            // boardElements[index].dispatchEvent(event);
            // boardElements[index].removeEventListener('build', gameboard.markBoard);
        },
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.fauxPlayer = this.fauxPlayer === players.players[0]?
            players.players[1] : players.players[0];
        },
        getPossibleMoves: function() {
            let xMoves = [];
            let oMoves = [];
            // for (y = 0; y < this.fauxBoard.length; y++) {
            //     for (x = 0; x < this.fauxBoard[y].length; x++) {
            //         if (this.fauxBoard[y][x] === null) {
            //             if (this.fauxPlayer.getMarker() === 'X') {
            //                 xMoves.push([y, x]);
            //             } else {
            //                 oMoves.push([y, x]);
            //             }
            //             this.fauxBoard[y][x] = this.fauxPlayer.getMarker();
            //             this.switchTurns();
            //         }
            //     }
            // }
            let possibleMoves = []
            for (y = 0; y < this.fauxBoard.length; y++) {
                for (x = 0; x < this.fauxBoard[y].length; x++) {
                    if (this.fauxBoard[y][x] === null) {
                        possibleMoves.push([y, x]);
                    }
                }
            }
            // this.switchTurns();
            // console.log(`----------xMoves----------`);
            // console.table(xMoves);
            // console.log(`----------oMoves----------`);
            // console.table(oMoves);
            // console.log(`----------possible moves----------`)
            // console.table(possibleMoves);
            // console.table(this.fauxBoard);
            return possibleMoves;
            // this.fauxBoard = null;
        },
        makeMove: function(i) {
            this.fauxBoard[i[0]][i[1]] = this.fauxPlayer.getMarker();
            // console.log(gameController.getGameState(this.fauxBoard));
            return gameController.getGameState(this.fauxBoard);
        },
        minimax: function(gameState) {
            //"You don't need to 'compare' the current board with any of the paths, there's no comparison needed other than the score for each path at depth 1 when all has been completed. Since you don't need to see all of the possible board states at the same time, you don't need to create copies of the board. Therefore, if you're only doing one path at a time, think about a simple way to make (a) move(s) then undo any as you backtrack and check other paths.
            this.switchTurns();
            console.log(`---------`)
            console.log(`gameState: ${gameState}`)
            if (gameState >= -1 && gameState !== null) {
                // return gameController.getGameState(gameboard.gameboard);
                console.log(`minimax ends`)
                console.table(this.fauxBoard)
                return this.fauxBoard;
            }
            let value;
            //if maximizingPlayer [human][X]
            //max player wants biggest number
            if (this.fauxPlayer.getMarker() === 'X') {
                value = -Infinity;
                this.getPossibleMoves().forEach(i => {
                    value = Math.max(value, this.minimax(this.makeMove(i)));
                })
                return value;
            } else {
                //minimizingPlayer [computer][O]
                //min player wants smallest number
                value = +Infinity;
                this.getPossibleMoves().forEach(i => {
                    value = Math.min(value, this.minimax(this.makeMove(i)));
                })
                return value;
            }
        },
    }

    gameboard.init();
    gameboard.render();
    players.init();
})();