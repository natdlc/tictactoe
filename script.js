const Game = (() => {

    let board = [,,,,,,,,,];
    const x = 'x';
    const o = 'o';
    let p1Score = 0;
    let p2Score = 0;
    let p1 = ''
    let p2 = '';

    const getElements = (() => {
        const cells = document.querySelectorAll('.cell');
        return {cells};
    })();

    const gameOver = () => {
        const body = document.querySelector('body');
        const modal = document.createElement('div');
        const announce = document.createElement('h1');
        const resetBtn = document.createElement('button');
        resetBtn.innerText = 'Play Again';
        resetBtn.classList.add('reset-btn');
        modal.classList.add('modal-end');
        announce.innerText = 'Game Over!';
        body.appendChild(modal);
        modal.appendChild(announce);
        modal.appendChild(resetBtn);
        resetBtn.addEventListener('click', () => {
            modal.remove();
            board = [,,,,,,,,,];
            winner = '';
            getElements.cells.forEach(cell => {
                if(cell.classList.contains(x) || cell.classList.contains(o)) {
                    cell.classList.remove(x);
                    cell.classList.remove(o);
                }
            })
        })
    }

    let winner = '';

    const checkWin = () => {
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
    let currentPlayer = 1;

    const clickAction = cell => {
        const cellPos = cell.target.dataset.pos;
        if (cell.target.classList.contains('o') || cell.target.classList.contains('x')) {
            return;
        }
        else if (currentPlayer) {
            cell.target.classList.toggle('x');
            board.splice(cellPos,1,'x');
            currentPlayer = 0;
        }
        else {
            cell.target.classList.toggle('o');
            board.splice(cellPos,1,'o');
            currentPlayer = 1;
        }
        winner = checkWin();
        if (winner === x || winner === o) {
            gameOver();
        }
    }

    getElements.cells.forEach(cell => {
        cell.addEventListener('click', clickAction)
    })
})();