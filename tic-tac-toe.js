document.addEventListener('DOMContentLoaded', function() {

    const gameBoard = document.getElementById('board');
    const squares = gameBoard.querySelectorAll('div');
    const statusDiv = document.getElementById('status');
    const newGameBtn = document.querySelector('.btn');
    
    squares.forEach(square => {
        square.classList.add('square');
    });

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && 
                gameState[a] === gameState[b] && 
                gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    }

    function handleSquareClick(index) {
        // Check if square is already occupied by X or O
        const isOccupied = squares[index].classList.contains('X') || 
                          squares[index].classList.contains('O') ||
                          gameState[index] !== '';
        
        if (!gameActive || isOccupied) {
            return;
        }

        // Update game state and display
        gameState[index] = currentPlayer;
        squares[index].textContent = currentPlayer;
        squares[index].classList.add(currentPlayer);

        // Check for winner
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
            statusDiv.classList.add('you-won');
            return;
        }

        // Check for tie
        if (!gameState.includes('')) {
            gameActive = false;
            statusDiv.textContent = "Game ended in a tie!";
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        // Clear all squares
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        
        // Restart status message
        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove('you-won');
    }

    // Event listeners for squares
    squares.forEach((square, index) => {
        square.addEventListener('click', function() {
            handleSquareClick(index);
        });

        // Hover effects
        square.addEventListener('mouseover', function() {
            if (gameActive && gameState[index] === '') {
                square.classList.add('hover');
            }
        });

        square.addEventListener('mouseout', function() {
            square.classList.remove('hover');
        });
    });

    newGameBtn.addEventListener('click', restartGame);
});