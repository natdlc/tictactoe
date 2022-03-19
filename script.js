const getElements = (() => {
    const cells = document.querySelectorAll('.cell');
    return {cells};
})();

const createPlayer = (name) => {
    const playerName = name;
    return {playerName};
}

const Game = (() => {
    const [...DOMboard] = getElements.cells;
    const x = 'x';
    const o = 'o';
    const board = [,,,,,,,,,];
    let moveSwitcher = 0;
    let winner;
    const start = () => {
        const Player = (() => {
            const checkWinner = () => {
                //x win conditions
                if (board[0] == x && board[1] == x && board[2] == x) winner = x
                else if (board[0] == x && board[3] == x && board[6] == x) winner = x
                else if (board[0] == x && board[4] == x && board[8] == x) winner = x
                else if (board[6] == x && board[7] == x && board[8] == x) winner = x
                else if (board[2] == x && board[5] == x && board[8] == x) winner = x
                else if (board[3] == x && board[4] == x && board[5] == x) winner = x
                else if (board[1] == x && board[4] == x && board[7] == x) winner = x
                else if (board[2] == x && board[4] == x && board[6] == x) winner = x
                //o win conditions
                else if (board[0] == o && board[1] == o && board[2] == o) winner = o
                else if (board[0] == o && board[3] == o && board[6] == o) winner = o
                else if (board[0] == o && board[4] == o && board[8] == o) winner = o
                else if (board[6] == o && board[7] == o && board[8] == o) winner = o
                else if (board[2] == o && board[5] == o && board[8] == o) winner = o
                else if (board[3] == o && board[4] == o && board[5] == o) winner = o
                else if (board[1] == o && board[4] == o && board[7] == o) winner = o
                else if (board[2] == o && board[4] == o && board[6] == o) winner = o;
                return winner;
            }
            const click = cell => {
                cell.addEventListener('click', e => {
                    const cellPos = e.target.dataset.pos;
                    if (moveSwitcher) {
                        e.target.classList.toggle(o);
                        board.splice(cellPos,1,o)
                        moveSwitcher = 0;
                    }
                    else {
                        e.target.classList.toggle(x);
                        board.splice(cellPos,1,x)
                        moveSwitcher = 1;
                    }
                    winner = checkWinner();
                });
            }
            return {click};
        })();
        DOMboard.forEach(Player.click);
    }

    const end = () => {

    }
    return {start, end};
})();

//if player presses start game
Game.start();

//if winner is not undefined
Game.end();