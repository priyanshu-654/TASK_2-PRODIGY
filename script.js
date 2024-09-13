const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
});

function handleClick(cell, index) {
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    if (checkWinner()) {
        messageElement.innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.includes('') === false) {
        messageElement.innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

restartButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.innerText = ''));
    messageElement.innerText = '';
    currentPlayer = 'X';
    gameActive = true;
});
