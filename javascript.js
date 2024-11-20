const gameSquares = document.querySelectorAll('.game-square');
const openDialog = document.querySelector('.open-dialog');
const addPlayers = document.querySelector('.add-players');
const newMove = document.querySelectorAll('.game-square');
const gameState = updateGame();
let moveCount = 0;

// listen for user to start game
openDialog.addEventListener('click', () => {
    dialog.showModal();
});

// listen for user to finish start form
addPlayers.addEventListener('click', storePlayerInfo);

// listen for new moves on game board
newMove.forEach(gameSquare => gameSquare.addEventListener('click', storeMoveInfo));

function storeMoveInfo(e) {
    const square = e.target.getAttribute('square-array-index');
    const squareTextContent = e.target.textContent;
    let symbol;

    // check if square is already played
    if (squareTextContent == "") {
        moveCount++;
    } else {
        return
    };

    if (moveCount % 2 === 0) {
        symbol = "O"
    } else {
        symbol = "X"
    };

    gameState.addSymbol(symbol, square);
    gameState.updateSquare();
    gameState.winnerCheck(symbol);
};

function storePlayerInfo() {

    // grab player names from form
    let playerOne = document.querySelector('#player-one');
    let playerTwo = document.querySelector('#player-two');

    return {playerOne, playerTwo};
}

function updateGame() {
    
    // start with blank gameboard
    let gameBoard = ["","","","","","","","",""];

    // update game square with symbol based on index of square
    function addSymbol (symbol, square) {
        gameBoard.splice(square,1,symbol);
        return gameBoard;
    };

    // update square display based on current state of gameboard
    function updateSquare () {
        
        // loop through gameboard array
        for (let i = 0; i < gameBoard.length; i++) {
            
            // get symbol for square
            let squareSymbol = gameBoard[i];

            // get div that matches square position
            let squareDisplay = document.querySelector(`div[square-array-index="${i}"]`)

            // update text content of square
            squareDisplay.textContent = squareSymbol;
        };
    };

    // check for winner after each move
    function winnerCheck (symbol) {
        if (
            // check if squares are not blank and square match vertically
            gameBoard[0] != "" && gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6] ||
            gameBoard[1] != "" && gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7] ||
            gameBoard[2] != "" && gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8] ||
            
            // check if squares are not blank and square match horizontally
            gameBoard[0] != "" && gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2] ||
            gameBoard[3] != "" && gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5] ||
            gameBoard[6] != "" && gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8] ||

            // check if squares are not blank and square match diagonally
            gameBoard[0] != "" && gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] ||
            gameBoard[2] != "" && gameBoard[2] == gameBoard[4] && gameBoard[0] == gameBoard[6]
        ) {
            // alert winner based on symbol
            if (symbol == "X") {
                alert `${storePlayerInfo.playerOne} is the winner`
            } else alert `${storePlayerInfo.playerTwo} is the winner`
        } else if (!gameBoard.includes("")) {
            alert('Tie game')
        }
    };

    return {addSymbol, updateSquare, winnerCheck};
};