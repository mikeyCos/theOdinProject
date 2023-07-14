// module pattern
const ticTacToe = (function() {
    //factory
    const player = (name, marker) => {
        let score = 0;
        const getName = () => name;
        const getMarker = () => marker;
        const getScore = () => score;
        const win = () => {
            updateScore();
            return [name, `is the winner`];
        }
        const updateScore = (x) => {
            !x ? score += 1 : score = 0;
        }
        const updateName = (newName) => name = newName;
        return {updateScore, getScore, updateName, getName, getMarker, win};
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
            this.buttonContainer = document.querySelector('.container-button.mode');
            this.selectWrapper = document.querySelector('.wrapper-select.select');
            this.selectElement = document.querySelector('#select');
            this.inputWrapper = document.querySelector('.wrapper-input.input');
            this.inputs = document.querySelectorAll('.wrapper-input.input input');
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
            wrapper.classList.add('wrapper-input', 'input');
            for (i = 0; i < this.players.length; i++) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                this.setAttributes(i, label, input)
                wrapper.appendChild(label);
                wrapper.appendChild(input);
            }
            this.buttonContainer.appendChild(wrapper);
            this.cacheDom();
        },
        setAttributes: function(i, label, input) {
            //sets attributes for labels/inputs
            //sets text node for label
            let id = 'player-one';
            let text = 'Player One';
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
            })
            label.setAttribute('for', id)
            const textNode = document.createTextNode(text);
            label.appendChild(textNode);
        },
        selectPlayer: function(e) {
            let selection = e.target.value;
            gameController.reset();
            scoreboardController.resetScores();
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
            //this works if the array is full
            this.gameboard.flat(1).forEach((value, index) => {
                // if (value === 'O') {
                //     this.boardSpanElements[index].style
                // }
                console.log(this.boardSpanElements[index].className)
                if (this.boardSpanElements[index].className === '' && value !== null) {
                    let classNames = ['marked', 'X'];
                    if (value === 'O') {
                        classNames[1] = 'O';
                    }
                    this.boardSpanElements[index].classList.add(classNames[0], classNames[1])
                } else if (value === null) {
                    this.boardSpanElements[index].className = '';
                }
                this.boardSpanElements[index].textContent = value;
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
                setTimeout(() => {
                    computer.computer(this.activePlayer);
                }, 700);
            }
            scoreboardController.render(this.activePlayer.getMarker());
        },
        getGameState: function(board) {
            // const board = gameboard.gameboard;
            let gameOver = false;
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
                return gameOver ? this.activePlayer.getMarker() === 'X' ? 1 : -1 : 0;
            } else {
                return gameOver;
            }
        },
        setGameStatus: function (state, board) {
            this.gameState = this.getGameState(gameboard.gameboard);
            console.log(`gameState: ${this.gameState}`) //for debugging
            if (this.gameState || this.gameState === 0) {
                let gameMessage;
                if (this.gameState === 1 || this.gameState === -1) {
                    gameMessage = this.activePlayer.win();
                    // debugger
                    scoreboardController.render(null, this.gameState, this.activePlayer.getScore());
                } else {
                    gameMessage = ['Draw'];
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
            message.forEach(i => {
                const winnerMessage = document.createElement('p');
                const textNode = document.createTextNode(i);
                wrapperWinner.appendChild(winnerMessage);
                winnerMessage.appendChild(textNode);
            })
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
            scoreboardController.render(this.activePlayer.getMarker())
        },
    }

    const scoreboardController = {
        init: function() {
            this.cacheDom();
            this.render(gameController.activePlayer.getMarker())
        },
        cacheDom: function() {
            this.scorePlayerOne = document.querySelector('.player-one');
            this.scorePlayerTwo = document.querySelector('.player-two');
            this.x = document.querySelector('.x');
            this.o = document.querySelector('.o');
        },
        render: function(marker) {
            if (marker === 'X') {
                this.o.classList.remove('active');
                this.x.classList.add('active');
            } else {
                this.x.classList.remove('active');
                this.o.classList.add('active');
            }
            this.scorePlayerOne.textContent = players.players[0].getScore();
            this.scorePlayerTwo.textContent = players.players[1].getScore();
        },
        resetScores: function() {
            players.players.forEach(player => {
                player.updateScore(true);
            })
            this.render(gameController.activePlayer.getMarker());
        }
    }

    const computer = {
        fauxBoard: null,
        fauxPlayer: null,
        computer: function(activePlayer) {
            //deep clone
            this.fauxPlayer = activePlayer;
            this.fauxBoard = JSON.parse(JSON.stringify(gameboard.gameboard))
            
            const event = new Event("build");
            const boardElements = gameboard.boardElements;
            boardElements.forEach(elem => elem.addEventListener('build', gameboard.markBoard));
            //computer randomly marks board
            let index = Math.floor(Math.random() * 8);
            // computer only marks if boardElements[index].textContent is empty
            while (boardElements[index].textContent !== '') {
                index = Math.floor(Math.random() * 8);
            }

            // console.log(`----------minimax running------------`)
            // this.minimax(this.fauxBoard);
            // console.log(this.minimax(this.fauxBoard))

            boardElements[index].dispatchEvent(event);
            boardElements[index].removeEventListener('build', gameboard.markBoard);
        },
        switchTurns: function() {
            //'X' goes first, then 'O'
            this.fauxPlayer = this.fauxPlayer === players.players[0]?
            players.players[1] : players.players[0];
        },
        getPossibleMoves: function() {
            let possibleMoves = []
            for (y = 0; y < this.fauxBoard.length; y++) {
                for (x = 0; x < this.fauxBoard[y].length; x++) {
                    if (this.fauxBoard[y][x] === null) {
                        possibleMoves.push([y, x]);
                    }
                }
            }
            console.table(possibleMoves); //for debugging
            return possibleMoves;
        },
        makeMove: function(board, i) {
            board[i[0]][i[1]] = this.fauxPlayer.getMarker();
            // this.switchTurns();
            return board;
        },
        minimax: function(board) {
            let gameState = gameController.getGameState(board);
            // console.log(`---------`);
            // console.log(`gameState: ${gameState}`);
            // console.table(board);
            if (gameState !== false) {
                console.table(board);
                return gameState
            }

            let value;
            if (this.fauxPlayer.getMarker() === 'X') {
                // console.log(`--------max running--------`);
                 //if maximizingPlayer [human][X]
                //max player wants biggest number
                value = -Infinity;
                this.getPossibleMoves().forEach(i => {
                    value = Math.max(value, this.minimax(this.makeMove(board, i)));;
                })
                // console.log(`--------min running--------`);
                return value;
            } else {
                // console.log(`--------min running--------`);
                //minimizingPlayer [computer][O]
                //min player wants smallest number
                value = +Infinity;
                this.getPossibleMoves().every(i => {
                    value = Math.min(value, this.minimax(this.makeMove(board, i)));
                })
                // console.log(`--------min end--------`)
                return value;
            }
        },
    }

    gameboard.init();
    gameboard.render();
    players.init();
    scoreboardController.init();
})();