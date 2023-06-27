// module pattern
const ticTacToe = (function() {
    //cache dom
    const _board = document.querySelector('#gameboard');

    let _gameboard = new Array(9);

    //renders empty board
    function _render(index, marker) {
        if (!index) {
            const ul = document.createElement('ul');
            for (i = 0; i < _gameboard.length; i++) {
                const li = document.createElement('li');
                ul.appendChild(li);
            }
            _board.appendChild(ul);
        } else {
            // _spaces[index].textContent = marker;
            const text = document.createTextNode(marker);
            _spaces[index].appendChild(text);

        }
    }

    _render();
    //event listeners
    const _spaces = _board.querySelectorAll('li');
    _spaces.forEach(list => list.addEventListener('click', _markBoardSpace));

    let counter = 0;
    function _markBoardSpace(e) {
        let marker;
        if (counter % 2 === 0) {
            marker = 'X';
        } else {
            marker = 'O';
        }

        //gets index of clicked elememt on the dom
        const elementIndex = Array.from(_spaces).indexOf(e.target);
        //gets array item at the index corresponding to the index of the element on the dom
        const gameboardItem = _gameboard[elementIndex];
        //if _gameboard[index of element] is empty
        if (!gameboardItem) {
            // update _gameboard[] and remove event listener
            _gameboard[elementIndex] = marker;
            _render(elementIndex, marker);
            e.target.removeEventListener('click', _markBoardSpace);
            console.log(`turn: ${counter++}`)
        }
    }

    function _checkGameStatus() {

    }

})();

// factory function
const Player = (score, maker) => {

}