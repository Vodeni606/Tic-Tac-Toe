let gameBoard = (function(){
    let board = [[],[],[]];

    // Fill each row with '#' to represent empty cells when game loads
    for (let i = 0;i < 3;i++){
        for (let j = 0; j <3; j++){
            board[i].push('#');
        }
    }

    return {    
        // Places a player's mark on a specific cell
        // Returns true if cell was empty and mark was placed
        // Returns false if cell was already taken
        updateBoard: function(row,column,player){
            if (board[row][column] === '#'){
                board[row][column] = player;
                return true;
            }else {
                return false;
            }
        },

        // Prints each row to the console for debugging
        displayBoard: function(){
            for (let i = 0; i < 3; i++){
                console.log(board[i]);
            }
        },

        // Wipes the board and refills with '#' for a new game
        resetBoard: function(){
            board = [[],[],[]];
            for (let i = 0;i < 3;i++){
                for (let j = 0; j <3; j++){
                    board[i].push('#');
                }   
            }
        },

        // Returns the board array so other objects can read it
        // Without this, board would be completely private
        getBoard : function(){
            return board;
        }
    }
})();


let player = function(name,mark){
    return {
        playername : name,   
        playermark : mark    
    }
}

//  The brain of the game, handles all logic
let gameController = (function(){
    // Create two players with hardcoded names for now
    const player1 = player("John","X")
    const player2 = player("Mark","O")

    // Tracks whose turn it is - starts with player1
    let start = player1;

    // Flag that tracks if the game is still running
    // Set to false when someone wins or ties
    let gameActive = true;

    // Private function - runs when game is over
    // Tells displayController to show the winner and stops the game
    function endGame(winner) {
        displayController.showWinner(winner);
        gameActive = false;
    }

    return {
        // Main function called when a player clicks a square
        // row and column come from the clicked square's data attributes
        turn: function(row,column){
            // If game is already over, do nothing
            if (gameActive === false){
                return;
            }
            // Try to place the mark - updateBoard handles the empty check
            const validMove = gameBoard.updateBoard(row,column,start.playermark);
            if (validMove){
                this.winCondition(); 
                this.tieCondition(); 
                this.switchTurn();   
                return true;         // tell displayController move was valid
            }else{
                return false;        // tell displayController move was invalid
            }   
        },

        // Switches current player between player1 and player2
        switchTurn: function(){
            if (start === player1){
                start = player2;
            }else {
                start = player1;
            }
        },

        winCondition: function(){
            const board = gameBoard.getBoard();
            if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== '#'){
                endGame(start.playermark);
            }
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '#'){
                endGame(start.playermark)
            }
            if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== '#'){
                endGame(start.playermark);
            }
            if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== '#'){
                endGame(start.playermark);
            }
            if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== '#'){
                endGame(start.playermark);
            }
            if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== '#'){
                endGame(start.playermark);
            }
            if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== '#'){
                endGame(start.playermark);
            }
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '#'){
                endGame(start.playermark);
            }
        },

        tieCondition: function(){
            const board = gameBoard.getBoard();
            for (let i = 0;i < 3;i++){
                for (let j = 0; j <3; j++){
                    if (board[i][j] === '#'){
                        return;
                    }
                }
            }
            displayController.showTie();
            gameActive = false;
        },

        // Resets everything back to the start for a new game
        resetGame: function(){
            gameBoard.resetBoard(); 
            gameActive = true;      // game is active again
            start = player1;        
        },

        // Exposes the current player object so displayController can use it
        getCurrentPlayer: function(){
            return start;
        }   
    }
})();

// DISPLAY CONTROLLER IIFE - handles everything the user sees and clicks
let displayController = (function(){
    // Select all DOM elements we need to interact with
    let square = document.querySelectorAll('.square'); 
    let setup = document.querySelector('.setup-container'); 
    let game = document.querySelector('.game-container');   
    let button = document.querySelector('button');          
    let winner = document.querySelector('.winner');         

    // When START GAME is clicked, switch from setup screen to game screen
    button.addEventListener('click', function(){
        setup.style.display = 'none';  // hide the setup screen
        game.style.display = 'block';  // show the game board
    })
    
    // Add a click listener to each of the 9 squares
    for (let i = 0; i < square.length; i++){
        square[i].addEventListener('click',function(event){
            // Get current player BEFORE turn switches
            let currentPlayer = gameController.getCurrentPlayer();
            // Try to make the move - returns true if valid, false if taken
            const validMove = gameController.turn(event.target.dataset.row, event.target.dataset.column);
            // Only show the mark visually if the move was actually valid
            if (validMove){
                event.target.textContent = currentPlayer.playermark;
            }
        })
    }

    // Expose functions for gameController to call when game ends
    return {
        // Shows winner message on the page
        showWinner: function(name){
            winner.textContent = `${name} has won`;
            winner.style.display = 'block';
        },
        // Shows tie message on the page
        showTie: function(){
            winner.textContent = "Its a tie";
            winner.style.display = 'block';
        }
    }
})();