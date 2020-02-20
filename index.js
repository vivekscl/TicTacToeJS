const { TicTacToe } = require('./src/models/tic-tac-toe');
const { readline, printWinner, exit } = require('./src/utils/input-output-helper');


const runGame = async () => {
    const player1Name = await readline('Enter name for Player 1:\n>> ');
    const player2Name = await readline('Enter name for Player 2:\n>> ');
    const ticTacToeGame = new TicTacToe(player1Name, player2Name);
    ticTacToeGame.printBoard();

    while (!ticTacToeGame.isGameOver) {
        let position = parseInt(await readline( `${ticTacToeGame.currentPlayer.name}, choose a box to place an \'${ticTacToeGame.currentPlayer.id}\' into:\n>> `));
        try {
            ticTacToeGame.placeMarker(position);
            ticTacToeGame.updateGameState();
        } catch (err) {
            console.error(err.message);
        }
        ticTacToeGame.printBoard();
    }

    printWinner(ticTacToeGame.winner);
    exit();
};

runGame();

