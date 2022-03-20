const Game = (() => {
    /* 
    to-do: 
        - ai (basic)
        - ai (ultimate)
        ** will come back for these in a while
    */
    //init values

    const Elements = (() => {
        const cells = document.querySelectorAll('.cell');
        const body = document.querySelector('body');
        const wrapper = document.querySelector('.wrapper');
        const p1NameElem = document.querySelector('.p1-name-display');
        const p1ScoreElem = document.querySelector('.p1-score-display');
        const p2NameElem = document.querySelector('.p2-name-display');
        const p2ScoreElem = document.querySelector('.p2-score-display');
        const undo = document.querySelector('.undo');
        return {cells, body, wrapper, p1NameElem, p1ScoreElem, p2NameElem, p2ScoreElem, undo};
    })();

    let board = [,,,,,,,,,];
    const x = 'x';
    const o = 'o';
    let p1Score = 0;
    let p2Score = 0;
    let p1 = ''
    let p2 = '';
    let winner = '';
    let currentPlayer = 1;
    let moveCounter = 0;
    let cellClicks = [];

    const undoClick = () => {
        if (moveCounter !== 0) moveCounter--;
        else if (moveCounter === 0) return;
        const lastCellClicked = cellClicks.pop();
        const boardSplice = lastCell => board.splice(lastCell, 1, null);
        if (currentPlayer) {
            currentPlayer = 0;
            Elements.cells[lastCellClicked].classList.toggle(o);
            boardSplice(lastCellClicked);
        }
        else if (!currentPlayer) {
            currentPlayer = 1;
            Elements.cells[lastCellClicked].classList.toggle(x);
            boardSplice(lastCellClicked);
        };
    };

    const undoFeatureOn = () =>  Elements.undo.addEventListener('click', undoClick);

    const updateScore = (roundWinner) => {
        if (roundWinner === p1) {
            p1Score++;
            Elements.p1ScoreElem.innerText = p1Score;
        }
        else if (roundWinner === p2) {
            p2Score++;
            Elements.p2ScoreElem.innerText = p2Score;
        };
    };

    const createModalStart = () => {
        const modal = document.createElement('div');
        const welcomeMessage = document.createElement('p');
        const p1Name = document.createElement('input');
        const p2Name = document.createElement('input');
        const startBtn = document.createElement('button');
        const aiBtn = document.createElement('button');
        aiBtn.classList.add('btn');
        aiBtn.classList.add('ai-btn');
        aiBtn.innerText = 'vs computer';
        welcomeMessage.innerText = `Tic Tac Toe`;
        welcomeMessage.style = 'font-size: max(8vmin, 16px);'
        startBtn.classList.add('start-btn');
        startBtn.innerText = 'start';
        modal.classList.add('modal-start')
        p1Name.classList.add('p1-name');
        p2Name.classList.add('p2-name');
        p1Name.setAttribute('type', 'text');
        p2Name.setAttribute('type', 'text');
        p1Name.setAttribute('placeholder', 'player 1 name');
        p2Name.setAttribute('placeholder', 'player 2 name');
        Elements.body.appendChild(modal);
        modal.appendChild(welcomeMessage);
        modal.appendChild(p1Name);
        modal.appendChild(p2Name);
        modal.appendChild(startBtn);
        modal.appendChild(aiBtn)
        Elements.wrapper.style = 'display: none;';
        startBtn.addEventListener('click', () => {
            if (p1Name.value == '') {
                p1Name.setAttribute('placeholder', 'invalid player 1 name');
                p1Name.style = 'border-bottom: 1px solid red;';
                return;
            };
            if (p2Name.value == '') {
                p2Name.style = 'border-bottom: 1px solid red;';
                p2Name.setAttribute('placeholder', 'invalid player 2 name');
                return
            }
            p1 = p1Name.value;
            p2 = p2Name.value;
            Elements.p1NameElem.innerText = p1;
            Elements.p2NameElem.innerText = p2;
            modal.remove();
            Elements.wrapper.style = 'display: grid;';
            undoFeatureOn();
        });
    };


    const clearBoard = () => {
        board = [,,,,,,,,,];
        winner = '';
        Elements.cells.forEach(cell => {
            if (cell.classList.contains(x) || cell.classList.contains(o)) {
                cell.classList.remove(x);
                cell.classList.remove(o);
            };
        });
    };

    const continueGame = () => clearBoard();

    const newGame = () => {
        clearBoard();
        p1Score = 0;
        p2Score = 0;
        Elements.p1ScoreElem.innerText = 0;
        Elements.p2ScoreElem.innerText = 0;
        createModalStart();
    };

    const createModalEnd = () => {
    
        const modal = document.createElement('div');
        const announce = document.createElement('h1');
        const continueBtn = document.createElement('button');
        const newGameBtn = document.createElement('button');
        newGameBtn.classList.add('new-game-btn', 'modal-end-btn');
        newGameBtn.innerText = 'new game';
        continueBtn.innerText = 'continue';
        continueBtn.classList.add('continue-btn', 'modal-end-btn');
        modal.classList.add('modal-end');
        if (winner == 'draw') {
            announce.innerText = `DRAW!`;
        }
        else {
            announce.innerText = `${winner} WINS!`;
        }
        Elements.body.appendChild(modal);
        modal.appendChild(announce);
        modal.appendChild(continueBtn);
        modal.appendChild(newGameBtn);
    };

    const gameOver = () => {
        const removeModal = modal => {
            modal.remove();
            currentPlayer = 1;
        };
        createModalEnd();
        document.querySelectorAll('.modal-end-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('new-game-btn')) {
                    newGame();
                    removeModal(document.querySelector('.modal-end'))
                }
                else {
                    continueGame();
                    removeModal(document.querySelector('.modal-end'))
                };
            });
        });
        moveCounter = 0;
    };

    const checkWin = () => {
        if (board[0] == x && board[1] == x && board[2] == x) winner = p1
        else if (board[0] == x && board[3] == x && board[6] == x) winner = p1;
        else if (board[0] == x && board[4] == x && board[8] == x) winner = p1;
        else if (board[6] == x && board[7] == x && board[8] == x) winner = p1;
        else if (board[2] == x && board[5] == x && board[8] == x) winner = p1;
        else if (board[3] == x && board[4] == x && board[5] == x) winner = p1;
        else if (board[1] == x && board[4] == x && board[7] == x) winner = p1;
        else if (board[2] == x && board[4] == x && board[6] == x) winner = p1;
        //o win conditions
        else if (board[0] == o && board[1] == o && board[2] == o) winner = p2;
        else if (board[0] == o && board[3] == o && board[6] == o) winner = p2;
        else if (board[0] == o && board[4] == o && board[8] == o) winner = p2;
        else if (board[6] == o && board[7] == o && board[8] == o) winner = p2;
        else if (board[2] == o && board[5] == o && board[8] == o) winner = p2;
        else if (board[3] == o && board[4] == o && board[5] == o) winner = p2;
        else if (board[1] == o && board[4] == o && board[7] == o) winner = p2;
        else if (board[2] == o && board[4] == o && board[6] == o) winner = p2;
        else if (moveCounter == 9) winner = 'draw';
        return winner;
    };

    const clickAction = cell => {
        const cellPos = cell.target.dataset.pos;
        if (cell.target.classList.contains(o) || cell.target.classList.contains(x)) {
            return;
        }
        else if (currentPlayer) {
            cell.target.classList.toggle(x);
            board.splice(cellPos,1,x);
            currentPlayer = 0;
        }
        else {
            cell.target.classList.toggle(o);
            board.splice(cellPos,1,o);
            currentPlayer = 1;
        };
        cellClicks.push(cellPos);
        moveCounter++;
        if (moveCounter >=5) console.log(moveCounter); winner = checkWin();
        if (winner === p1) {
            updateScore(p1);
            gameOver();
        }
        else if (winner === p2) {
            updateScore(p2);
            gameOver();
        }
        else if (winner === 'draw') {
            updateScore('draw');
            gameOver();
        };
    };

    Elements.cells.forEach(cell => cell.addEventListener('click', clickAction));

    createModalStart();
})();