let gameBoard = (function(){
    let board = [[],[],[]];

    for (let i = 0;i < 3;i++){
        for (let j = 0; j <3; j++){
            board[i].push('#');
        }
        
    }

    return {    
        updateBoard: function(row,column,player){
            if (board[row][column] === '#'){
                board[row][column] = player;
                return true;
            }else {
                return false;
            }
            
        },
        displayBoard: function(){
            for (let i = 0; i < 3; i++){
                console.log(board[i]);
            }
        },
        resetBoard: function(){
            board = [[],[],[]];
            for (let i = 0;i < 3;i++){
                for (let j = 0; j <3; j++){
                    board[i].push('#');
                }   
        
            }
        },
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

let gameController = (function(){
    const player1 = player("John","X")
    const player2 = player("Mark","O")

    let start = player1;
    let gameActive = true;

    function endGame(winner) {
    console.log(`${winner} has won`);
    gameActive = false;
    }

    return {
        turn: function(row,column){
            if (gameActive === false){
                return;
            }
            const validMove = gameBoard.updateBoard(row,column,start.playermark);
            if (validMove){
                this.winCondition();
                this.tieCondition();
                this.switchTurn();
            }else{

            }
            
        },
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
            }if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board [0][0] !== '#'){
                endGame(start.playermark)
            }if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== '#'){
                endGame(start.playermark);
            }if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== '#'){
                endGame(start.playermark);
            }if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== '#'){
                endGame(start.playermark);
            }if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== '#'){
                endGame(start.playermark);
            }if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== '#'){
                endGame(start.playermark);
            }if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '#'){
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
            console.log("Its a tie");
            gameActive = false;
        },
        resetGame: function(){
            gameBoard.resetBoard();
            gameActive = true;
            start = player1;
        }
    }
})();



gameController.turn(0, 0); // X
gameController.turn(1, 0); // O
gameController.turn(0, 1); // X
gameController.turn(1, 1); // O
gameController.turn(0, 2); // X wins!
gameController.turn(2, 2); // should not work!
gameBoard.displayBoard();
