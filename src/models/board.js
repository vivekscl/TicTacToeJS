const { printCell, printCellDivider, printBottomDivider, printNewline } = require('../utils/input-output-helper');
const { isNumber } = require('../utils/helper');
const { PLAYER_1_ID, PLAYER_2_ID, DIRECTIONS } = require('../utils/constants');
const { InvalidInputError } = require('../errors/error-classes');
const { BOX_OUT_OF_BOUNDS, NON_EMPTY_BOX, INPUT_IS_NOT_A_NUMBER } = require('../errors/error-messages');

/**
 * Represents the board that will be used to play the game.
 */
class Board {

    /**
     * @constructs Board
     * @param  {Number} N Number of rows and columns
     */
    constructor(N) {
        this.boxToCellMap = {};
        this.board = [];
        this._createBoard(N);
    }

    /**
     * Creates the tic-tac-toe board.
     * @private
     * @param  {Number} N Number of rows and columns.
     */
    _createBoard(N) {
        // Create Grid
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
            printBottomDivider(this.board.length);
        }
        printNewline();
    }

    /**
     * Places the currentPlayer's marker on the given box.
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
        currentPlayer.updateLastPlacedMarker(box);
    }

    /**
     * Gets the ID of the winner, if any.
     * @param {Player} currentPlayer
     * @return {String}
     */
    getWinnerId(currentPlayer) {
        const [lastPlacedRow, lastPlacedCol] = this.boxToCellMap[currentPlayer.lastPlacedMarker];
        for (let direction of DIRECTIONS) {
            if(this._checkIfWonAnyDirection(direction, 0, lastPlacedRow, lastPlacedCol, currentPlayer.id)) {
                return currentPlayer.id;
            }
        }
        return null;
    }

    /**
     * Checks if the board is full i.e. all moves have been exhausted.
     * @return {boolean}
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
     * Checks if the given cell is vacant.
     * @private
     * @param  {Number} cell
     * @return {boolean}
     */
    _isVacant(cell) {
        return cell !== PLAYER_1_ID && cell !== PLAYER_2_ID;
    }

    /**
     * Checks if the given box is within the bounds of the board.
     * @private
     * @param  {Number} box The box to place marker on.
     * @return {boolean}
     */
    _isWithinBoard(box) {
        return box >= 1 && box <= Math.pow(this.board.length, 2);
    }

    /**
     * Checks if the player has won in any direction.
     * @private
     * @param  {Array} direction The row and col direction to move after checking
     * @param  {Number} numMatches
     * @param  {Number} currentRow
     * @param  {Number} currentCol
     * @param  {String} playerId
     * @return {boolean} Whether the player has won.
     */
    _checkIfWonAnyDirection(direction, numMatches, currentRow, currentCol, playerId) {
        if (numMatches === 3) {
            return true;
        } else if (this._isOutOfBounds(currentRow) || this._isOutOfBounds(currentCol)) {
            return false;
        } else if (this.board[currentRow][currentCol] === playerId) {
            return this._checkIfWonAnyDirection(direction, numMatches+1, currentRow + direction[0], currentCol + direction[1], playerId);
        }
        return false;
    }

    /**
     * Checks if the given index is out of bounds.
     * @private
     * @param  {Number} index The box to place marker on.
     * @return {boolean} Whether given index is out of bounds.
     */
    _isOutOfBounds(index) {
        return index < 0 || index >= this.board.length;
    }

}

module.exports = { Board };
