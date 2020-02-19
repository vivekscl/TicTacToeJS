const { Player } = require('./player');
const { Board } = require('./board');
const { PLAYER_1_ID, PLAYER_2_ID } = require('../utils/constants');

/**
 * Represents the game that accepts inputs and updates the game state accordingly.
 */
class TicTacToe {

    /**
     * @constructs TicTacToe
     * @param  {Player} Player1Name
     * @param  {Player} Player2Name
     * @param  {Number} N Number of rows and columns
     */
    constructor(Player1Name, Player2Name, N = 3) {
        this.player1 = new Player(PLAYER_1_ID, Player1Name);
        this.player2 = new Player(PLAYER_2_ID, Player2Name);
        this.currentPlayer = this.player1;
        this.isGameOver = false;
        this.winner = null;
        this.board = new Board(N);
    }

    /**
     * Places the marker of the current player on chosen box.
     * @param  {Number} box The box to place marker on.
     */
    placeMarker(box) {
        this.board.placeMarker(box, this.currentPlayer);
    }

    /**
     * Updates the state of the game.
     */
    updateGameState() {
        const winnerId = this.board.getWinnerId();
        if (winnerId !== null) {
            this.isGameOver = true;
            this.winner = winnerId === PLAYER_1_ID ? this.player1 : this.player2;
        } else if (this.board.isBoardFull()) {
            this.isGameOver = true;
            this.winner = null;
        }
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    printBoard() {
        this.board.printBoard();
    }
}

module.exports = { TicTacToe };
