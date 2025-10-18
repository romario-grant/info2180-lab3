document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('board');
    
    const squares = gameBoard.querySelectorAll('div');
    
    squares.forEach(square => {
        square.classList.add('square');
    });
});
