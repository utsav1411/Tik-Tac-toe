const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.innerHTML = '';
    boardState.forEach((_, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = index;
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    });
}

function handleSquareClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes(null)) {
        message.textContent = "It's a Draw!";
        gameActive = false;
    }
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
    createBoard();
}

createBoard();
