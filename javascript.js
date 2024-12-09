const gameSquares = document.querySelectorAll('.game-square');
const openDialog = document.querySelector('.open-dialog');
const addPlayers = document.querySelector('.add-players');
const newMove = document.querySelectorAll('.game-square');
const gameState = updateGame();
let playerInfo = getPlayerInfo();
let playerUpdates = updatePlayer();
let moveCount = 0;
let gameStatus;
let gameBoard = ["","","","","","","","",""];

// listen for user to start game
openDialog.addEventListener('click', () => {
    gameBoard = ["","","","","","","","",""];
    gameState.updateSquare();
    gameStatus = "";
    dialog.showModal();
});

// listen for user to finish start form
addPlayers.addEventListener('click', getPlayerInfo);

// listen for new moves on game board
newMove.forEach(gameSquare => gameSquare.addEventListener('click', gameState.storeMoveInfo));

// store player names (POTENTIAL UPGRADE = move inside updatePlayer() factory function)
function getPlayerInfo() {

    // grab player names from form
    let playerOne = document.querySelector('#player-one').value;
    let playerTwo = document.querySelector('#player-two').value;

    return{playerOne, playerTwo};
};

function updatePlayer() {

    // check for winner after each move
    function winnerCheck (symbol, gameBoard) {
                
        // reset playerInfo variable to most up-to-date state of getPlayerInfo() values
        playerInfo = getPlayerInfo();

        if (
            // check if squares are not blank and square match vertically
            gameBoard[0] !== "" && gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] ||
            gameBoard[1] !== "" && gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7] ||
            gameBoard[2] !== "" && gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] ||
            
            // check if squares are not blank and square match horizontally
            gameBoard[0] !== "" && gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] ||
            gameBoard[3] !== "" && gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] ||
            gameBoard[6] !== "" && gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] ||

            // check if squares are not blank and square match diagonally
            gameBoard[0] !== "" && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] ||
            gameBoard[2] !== "" && gameBoard[2] === gameBoard[4] && gameBoard[0] === gameBoard[6]
        ) {
            
            // store winning condition via gameStatus variable to prevent more moves
            gameStatus = "Finished";

            // alert winner based on symbol
            // must set timeout for alerts because they will appear before winning move is shown (unclear reason)
            if (symbol === "X") {
                setTimeout(function() {
                    alert (`${playerInfo.playerOne} is the winner`);
                },1000);
            } else setTimeout(function() {
                alert (`${playerInfo.playerTwo} is the winner`);
            },1000);
        } else if (!gameBoard.includes("")) {
            alert('Tie game');
        }
    };

    return {winnerCheck};
}

function updateGame() {    

    // update game square with symbol based on index of square
    function addSymbol (symbol, square) {
        gameBoard.splice(square,1,symbol);
        return {gameBoard};
    };

    // update square display based on current state of gameboard
    function updateSquare (symbol) {
        
        // loop through gameboard array
        for (let i = 0; i < gameBoard.length; i++) {
            
            // get symbol for square
            let squareSymbol = gameBoard[i];

            // get div that matches square position
            let squareDisplay = document.querySelector(`div[square-array-index="${i}"]`)

            // update text content of square
            squareDisplay.textContent = squareSymbol;
        };

        playerUpdates.winnerCheck(symbol, gameBoard);
    };

    function storeMoveInfo(e) {
        const square = e.target.getAttribute('square-array-index');
        const squareTextContent = e.target.textContent;
        let symbol;

        // reset playerInfo variable to most up-to-date state of getPlayerInfo() values
        playerInfo = getPlayerInfo();

        // check if player info is stored
        if (!playerInfo.playerOne) {
            return
        };

        // check if winning move has been played
        if (gameStatus === "Finished") {
            return
        };

        // check if square is already played
        if (squareTextContent === "") {
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
        gameState.updateSquare(symbol);
    };

    return {addSymbol, updateSquare, storeMoveInfo};
};