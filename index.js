const { TicTacToe } = require('./src/models/tic-tac-toe');
const { readline, printWinner, exit } = require('./src/utils/input-output-helper');
const { INPUT_IS_NOT_A_NUMBER, N_IS_TOO_SMALL } = require('./src/errors/error-messages');
const { isNumber } = require('./src/utils/helper');

const readN = async () => {
    let N = -1;
    while (!isNumber(N) || N < 3) {
        N = parseInt(await readline('Enter the size of the board (NxN)(N >= 3):\n>> '));
        if (!isNumber(N)) {
            console.error(INPUT_IS_NOT_A_NUMBER);
        } else if (N < 3) {
            console.error(N_IS_TOO_SMALL);
        }
    }
    return N;
};

const runGame = async () => {
    let N = await readN();
    const player1Name = await readline('Enter name for Player 1:\n>> ');
    const player2Name = await readline('Enter name for Player 2:\n>> ');
    const ticTacToeGame = new TicTacToe(player1Name, player2Name, N);
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

