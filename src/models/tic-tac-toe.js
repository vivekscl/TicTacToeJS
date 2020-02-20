const { Player } = require('./player');
const { Board } = require('./board');
const { PLAYER_1_ID, PLAYER_2_ID } = require('../utils/constants');

/**
 * Represents the game that accepts inputs and updates the game state accordingly.
 */
class TicTacToe {

    /**
     * @constructs TicTacToe
     * @param  {String} Player1Name
     * @param  {String} Player2Name
     * @param  {Number} N Number of rows and columns
     */
    constructor(Player1Name, Player2Name, N = 3) {
        this.player1 = new Player(PLAYER_1_ID, Player1Name);
        this.player2 = new Player(PLAYER_2_ID, Player2Name);
        this.currentPlayer = this.player1;
        this.isGameOver = false;
        this.winner = null;
        this.gameBoard = new Board(N);
    }

    /**
     * Places the marker of the current player on chosen box.
     * @param  {Number} box The box to place marker on.
     */
    placeMarker(box) {
        this.gameBoard.placeMarker(box, this.currentPlayer);
    }

    /**
     * Updates the state of the game.
     */
    updateGameState() {
        const winnerId = this.gameBoard.getWinnerId();
        if (winnerId !== null) {
            this.isGameOver = true;
            this.winner = winnerId === PLAYER_1_ID ? this.player1 : this.player2;
        } else if (this.gameBoard.isBoardFull()) {
            this.isGameOver = true;
            this.winner = null;
        }
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    printBoard() {
        this.gameBoard.printBoard();
    }
}

module.exports = { TicTacToe };
