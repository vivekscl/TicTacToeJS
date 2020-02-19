const { printCell, printCellDivider, printBottomDivider, printNewline } = require('../utils/input-output-helper');
const { isNumber } = require('../utils/helper');
const { PLAYER_1_ID, PLAYER_2_ID } = require('../utils/constants');
const { InvalidInputError } = require('../errors/error-classes');
const { BOX_OUT_OF_BOUNDS, NON_EMPTY_BOX, INPUT_IS_NOT_A_NUMBER } = require('../errors/error-messages');

/**
 * Represents the game board that will be used to play the game.
 */
class Board {

    /**
     * @constructs Board
     * @param  {Number} N Number of rows and columns
     */
    constructor(N) {
        this.boxToCellMap = {};
        this._createBoard(N);
    }

    /**
     * Creates the tic-tac-toe board.
     * @private
     * @param  {Number} N Number of rows and columns.
     */
    _createBoard(N) {
        // Create Grid
        this.board = [];
        for (let row = 0; row < N; row++) {
            this.board.push(new Array(N).fill(1));
        }
        // Fill 1st column of all rows
        for (let row = 1; row < N; row++) {
            this.board[row][0] = this.board[row-1][0] + N;
        }
        // Fill the rest of the cells by adding one to previous row element
        for (let row = 0; row < N; row++) {
            for (let col = 1; col < N; col++) {
                this.board[row][col] = this.board[row][col-1] + 1;
            }
        }
        // Fill up boxToCellMap
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                this.boxToCellMap[this.board[row][col]] = [row, col];
            }
        }
    }

    /**
     * Prints the board to the console.
     */
    printBoard() {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board.length; col++) {
                printCell(this.board[row][col]);
                if (col !== this.board.length - 1) {
                    printCellDivider();
                }
            }
            printBottomDivider();
        }
        printNewline();
    }

    /**
     * Places the marker on given box using the current player's ID.
     * @param  {Number} box The box to place marker on.
     * @param  {Player} currentPlayer
     * @throws {InvalidInputError} Given box must be a number, must not out of bounds and must not be filled.
     */
    placeMarker(box, currentPlayer) {
        if (!isNumber(box)) {
            throw new InvalidInputError(INPUT_IS_NOT_A_NUMBER);
        } else if (!this._isWithinBoard(box)) {
            throw new InvalidInputError(BOX_OUT_OF_BOUNDS);
        }
        const [row, col] = this.boxToCellMap[box];
        if (!this._isVacant(this.board[row][col])) {
            throw new InvalidInputError(NON_EMPTY_BOX);
        }
        this.board[row][col] = currentPlayer.id;
    }

    /**
     * Gets the ID of the winner, if any.
     * @return {String} The ID of the winner.
     */
    getWinnerId() {
        const winnerHorizontal = this._getWinnerIdForHorizontalWin();
        const winnerVertical = this._getWinnerIdForVerticalWin();
        const winnerDiagonal = this._getWinnerForDiagonalWin();

        if (winnerHorizontal !== null) {
            return winnerHorizontal;
        } else if (winnerVertical !== null) {
            return winnerVertical;
        } else if (winnerDiagonal !== null) {
            return winnerDiagonal
        }

        return null;
    }

    /**
     * Checks if the board is full i.e. all moves have been exhausted
     * @return {boolean} Whether the board is full or not.
     */
    isBoardFull() {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board.length; col++) {
                if (isNumber(this.board[row][col])) return false;
            }
        }
        return true;
    }

    /**
     * Gets the ID of the player that has 3 markers in a row horizontally, if any.
     * @private
     * @return {String} The ID of the winner
     */
    _getWinnerIdForHorizontalWin() {
        for (let row of this.board) {
            const setOfRowValues = new Set(row);
            if (setOfRowValues.size === 1) {
                return row[0];
            }
        }
        return null;
    }

    /**
     * Gets the ID of the player that has 3 markers in a row vertically, if any.
     * @private
     * @return {String} The ID of the winner
     */
    _getWinnerIdForVerticalWin() {
        for (let col = 0; col < this.board.length; col++) {
            if (this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col]) {
                return this.board[0][col];
            }
        }
        return null;
    }

    /**
     * Gets the ID of the player that has 3 markers in a row diagonally, if any.
     * @private
     * @return {String} The ID of the winner
     */
    _getWinnerForDiagonalWin() {
        if ((this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2])
            || (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0])) {
            return this.board[1][1];
        }
        return null;
    }

    /**
     * Checks if the given cell is vacant.
     * @private
     * @param  {Number} cell
     * @return {boolean} Whether the cell is vacant.
     */
    _isVacant(cell) {
        return cell !== PLAYER_1_ID && cell !== PLAYER_2_ID;
    }

    /**
     * Checks if the given box is within the bounds of the board.
     * @private
     * @param  {Number} box The box to place marker on.
     * @return {boolean} Whether given box is within the bounds of the board.
     */
    _isWithinBoard(box) {
        return box >= 1 && box <= Math.pow(this.board.length, 2);
    }

}

module.exports = { Board };
