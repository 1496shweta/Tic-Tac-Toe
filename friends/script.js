const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let boardState = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    const cellIndex = Array.from(cells).indexOf(cell);
    
    // Place the mark (X or O)
    placeMark(cell, currentClass);
    boardState[cellIndex] = currentClass;

    // Check for win or draw
    if (checkWin(currentClass)) {
        displayMessage(`${currentClass} Wins!`);
    } else if (isDraw()) {
        displayMessage(`It's a Draw!`);
    } else {
        // Switch turns
        isXTurn = !isXTurn;
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentClass;
        });
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function displayMessage(message) {
    messageElement.textContent = message;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
    isXTurn = true;
    boardState = Array(9).fill(null);
    messageElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

document.querySelector("#home").addEventListener("click", function() {
    window.location.href = "../Tic-Tac-Toe/index.html"; // Adjust the path as needed
});