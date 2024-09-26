// JavaScript for Tic-Tac-Toe game with hard AI (Minimax Algorithm)

// Select all the cells and reset button
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('status');

// Initialize game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player is 'X'
let isGameActive = true;

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click event
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-index');
  
  if (board[cellIndex] === '' && isGameActive) {
    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWinner()) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      isGameActive = false;
      return;
    } else if (isBoardFull()) {
      statusDisplay.textContent = 'It\'s a tie!';
      isGameActive = false;
      return;
    }
    
    // After player move, AI makes a move
    currentPlayer = 'O';
    aiMove(); // Call hard AI move function using Minimax
  }
}

// AI Move using Minimax Algorithm
function aiMove() {
  const bestMove = minimax(board, 'O');
  board[bestMove.index] = 'O'; // AI plays 'O'
  cells[bestMove.index].textContent = 'O';
  
  if (checkWinner()) {
    statusDisplay.textContent = 'AI wins!';
    isGameActive = false;
    return;
  } else if (isBoardFull()) {
    statusDisplay.textContent = 'It\'s a tie!';
    isGameActive = false;
    return;
  }
  
  currentPlayer = 'X'; // Switch back to player
}

// Minimax Algorithm
function minimax(newBoard, player) {
  const availSpots = getAvailableSpots(newBoard);
  
  // Check for terminal states (win/tie) and return a score
  if (checkWinnerForMinimax(newBoard, 'X')) {
    return { score: -10 };
  } else if (checkWinnerForMinimax(newBoard, 'O')) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 }; // Tie
  }

  const moves = [];
  
  // Loop through available spots
  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    // Recursively get the score from the minimax function
    if (player === 'O') {
      const result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      const result = minimax(newBoard, 'O');
      move.score = result.score;
    }

    // Reset the spot to empty
    newBoard[availSpots[i]] = '';
    moves.push(move);
  }

  // Find the best move
  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  }

  return bestMove;
}

// Get all available spots on the board
function getAvailableSpots(board) {
  return board.reduce((acc, el, i) => {
    if (el === '') acc.push(i);
    return acc;
  }, []);
}

// Check if there's a winner (for minimax)
function checkWinnerForMinimax(board, player) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// Check if there's a winner (for the main game)
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Check if the board is full (for a tie)
function isBoardFull() {
  return board.every(cell => cell !== '');
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
  statusDisplay.textContent = '';
}

document.querySelector("#home").addEventListener("click", function() {
  window.location.href = "../Tic-Tac-Toe/index.html"; // Adjust the path as needed
});