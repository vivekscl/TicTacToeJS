const { TicTacToe } = require('./models/tic-tac-toe');
const { readline, printWinner, exit } = require('./utils/input-output-helper');


const runGame = async () => {
    const Player1Name = await readline('Enter name for Player 1:\n>> ');
    const Player2Name = await readline('Enter name for Player 2:\n>> ');
    const TicTacToeGame = new TicTacToe(Player1Name, Player2Name);
    TicTacToeGame.printBoard();

    while (!TicTacToeGame.isGameOver) {
        let position = await readline( `${TicTacToeGame.currentPlayer.name}, choose a box to place an \'${TicTacToeGame.currentPlayer.id}\' into:\n>> `);
        try {
            TicTacToeGame.placeMarker(position);
            TicTacToeGame.updateGameState();
        } catch (err) {
            console.error(err.message);
        }
        TicTacToeGame.printBoard();
    }

    printWinner(TicTacToeGame.winner);
    exit();
};

runGame();

