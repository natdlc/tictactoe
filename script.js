const Game = (() => {
    /* 
    to-do: 
        - player score display
        - undo button
        - modal (start & end) design
        - require non-blank names
        - create draw scenario
    */
    //init values
    const Elements = (() => {
        const cells = document.querySelectorAll('.cell');
        const body = document.querySelector('body');
        return {cells, body};
    })();
    let board = [,,,,,,,,,];
    const x = 'x';
    const o = 'o';
    let p1Score = 0;
    let p2Score = 0;
    let p1 = ''
    let p2 = '';
    let winner = '';

    const createModalStart = () => {
        const modal = document.createElement('div');
        const welcomeMessage = document.createElement('p');
        const p1Name = document.createElement('input');
        const p2Name = document.createElement('input');
        const startBtn = document.createElement('button');
        const aiBtn = document.createElement('button');
        aiBtn.classList.add('btn')
        aiBtn.innerText = 'vs computer'
        welcomeMessage.innerText = `let's play tic tac toe!`;
        startBtn.classList.add('start-btn');
        startBtn.innerText = 'start';
        modal.classList.add('modal-start')
        p1Name.classList.add('p1-name');
        p2Name.classList.add('p2-name');
        p1Name.setAttribute('type', 'text');
        p2Name.setAttribute('type', 'text');
        p1Name.setAttribute('placeholder', 'player one name');
        p2Name.setAttribute('placeholder', 'player two name');
        Elements.body.appendChild(modal);
        modal.appendChild(welcomeMessage);
        modal.appendChild(p1Name);
        modal.appendChild(p2Name);
        modal.appendChild(startBtn);
        modal.appendChild(aiBtn)
        startBtn.addEventListener('click', () => {
            p1 = p1Name.value;
            p2 = p2Name.value;
            modal.remove();
        })
    };
    createModalStart();

    const continueGame = () => {
        board = [,,,,,,,,,];
        winner = '';
        Elements.cells.forEach(cell => {
            if(cell.classList.contains(x) || cell.classList.contains(o)) {
                cell.classList.remove(x);
                cell.classList.remove(o);
            };
        });
    };

    const restartGame = () => {
        board = [,,,,,,,,,];
        winner = '';
        Elements.cells.forEach(cell => {
            if(cell.classList.contains(x) || cell.classList.contains(o)) {
                cell.classList.remove(x);
                cell.classList.remove(o);
            };
        });
        p1Score = 0;
        p2Score = 0;
        createModalStart();
    }

    const createModalEnd = () => {
    
        const modal = document.createElement('div');
        const announce = document.createElement('h1');
        const continueBtn = document.createElement('button');
        const restartBtn = document.createElement('button');
        restartBtn.classList.add('restart-btn', 'modal-end-btn');
        restartBtn.innerText = 'restart';
        continueBtn.innerText = 'continue';
        continueBtn.classList.add('continue-btn', 'modal-end-btn');
        modal.classList.add('modal-end');
        announce.innerText = `${winner} wins!`;
        Elements.body.appendChild(modal);
        modal.appendChild(announce);
        modal.appendChild(continueBtn);
        modal.appendChild(restartBtn);
        console.log(`P1 score: ${p1Score}`)
        console.log(`P2 score: ${p2Score}`)
    }

    const gameOver = () => {
        const removeModal = modal => {
            modal.remove();
            currentPlayer = 1;
        }
        createModalEnd();
        document.querySelectorAll('.modal-end-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('restart-btn')) {
                    restartGame();
                    removeModal(document.querySelector('.modal-end'))
                    console.log('rest')
                }
                else {
                    continueGame();
                    removeModal(document.querySelector('.modal-end'))
                    console.log('cont')
                }
            })
        })
    }

    const checkWin = () => {
        if (board[0] == x && board[1] == x && board[2] == x) winner = p1
        else if (board[0] == x && board[3] == x && board[6] == x) winner = p1
        else if (board[0] == x && board[4] == x && board[8] == x) winner = p1
        else if (board[6] == x && board[7] == x && board[8] == x) winner = p1
        else if (board[2] == x && board[5] == x && board[8] == x) winner = p1
        else if (board[3] == x && board[4] == x && board[5] == x) winner = p1
        else if (board[1] == x && board[4] == x && board[7] == x) winner = p1
        else if (board[2] == x && board[4] == x && board[6] == x) winner = p1
        //o win conditions
        else if (board[0] == o && board[1] == o && board[2] == o) winner = p2
        else if (board[0] == o && board[3] == o && board[6] == o) winner = p2
        else if (board[0] == o && board[4] == o && board[8] == o) winner = p2
        else if (board[6] == o && board[7] == o && board[8] == o) winner = p2
        else if (board[2] == o && board[5] == o && board[8] == o) winner = p2
        else if (board[3] == o && board[4] == o && board[5] == o) winner = p2
        else if (board[1] == o && board[4] == o && board[7] == o) winner = p2
        else if (board[2] == o && board[4] == o && board[6] == o) winner = p2;
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
        if (winner === p1) {
            p1Score++;
            gameOver();
        }
        if (winner === p2) {
            p2Score++;
            gameOver();
        }
    }

    Elements.cells.forEach(cell => {
        cell.addEventListener('click', clickAction)
    })
})();