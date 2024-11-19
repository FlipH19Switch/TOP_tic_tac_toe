const gameSquares = document.querySelectorAll('.game-square');
const openDialog = document.querySelector('.open-dialog');
const addPlayers = document.querySelector('.add-players')

// listen for user to start game
openDialog.addEventListener('click', () => {
    dialog.showModal();
});

// listen for user to finish start form
addPlayers.addEventListener('click', addPlayerInfo);

/* Current area of work
function addPlayerInfo() {

}
*/

function updateGame() {
    
    // start with blank gameboard
    let gameBoard = ["","","","","","","","",""];

    // update game square with symbol based on index of square
    function addSymbol (symbol, square) {
        gameBoard.splice(square,1,symbol);
        return gameBoard;
    };

    // update tile display based on current state of gameboard
    function updateTile () {
        
        // loop through gameboard array
        for (let i = 0; i < gameBoard.length; i++) {
            
            // get symbol for tile
            let tileSymbol = gameBoard[i];

            // get div that matches tile position
            let tileDisplay = document.querySelector(`div[square-array-index="${i}"]`)

            // update text content of tile
            tileDisplay.textContent = tileSymbol;
        };
    };

    // check for winner after each move
    function winnerCheck (symbol) {
        if (
            // check if tiles are not blank and tiles match vertically
            gameBoard[0] != "" && gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6] ||
            gameBoard[1] != "" && gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7] ||
            gameBoard[2] != "" && gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8] ||
            
            // check if tiles are not blank and tiles match horizontally
            gameBoard[0] != "" && gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2] ||
            gameBoard[3] != "" && gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5] ||
            gameBoard[6] != "" && gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8] ||

            // check if tiles are not blank and tiles match diagonally
            gameBoard[0] != "" && gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] ||
            gameBoard[2] != "" && gameBoard[2] == gameBoard[4] && gameBoard[0] == gameBoard[6]
        ) {
            alert(`${symbol} is the winner`)
        } else if (!gameBoard.includes("")) {
            alert('Tie game')
        }
    };

    return {addSymbol, updateTile, winnerCheck};
};

const gameState = updateGame();
gameState.addSymbol("X",3);
gameState.addSymbol("X",4);

gameState.updateTile();
gameState.winnerCheck("X");