let gameBoard = (function(){
    let board = [[],[],[]];

    for (let i = 0;i < 3;i++){
        for (let j = 0; j <3; j++){
            board[i].push('#');
        }
        
    }

    return {
        updateBoard: function(row,column,player){
            board[row][column] = player;

        },
        displayBoard: function(){
            for (let i = 0; i < 3; i++){
                console.log(board[i]);
            }
        },
        resetBoard: function(){
        }
    }
})();


gameBoard.updateBoard(0,0,'X');
gameBoard.displayBoard();