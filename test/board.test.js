const {Board} = require("../src/models/board");
const {Player} = require("../src/models/player");
const {InvalidInputError} = require("../src/errors/error-classes");
const {PLAYER_1_ID} = require("../src/utils/constants");
const N = 3;

describe('Board Class', () => {
    describe('constructor', () => {
        test('should construct a new 3x3 board', () => {
            const board = new Board(N);
            const firstCellValue = 1;
            for (let row = 0; row < N; row++) {
                for (let col = 0; col < N; col++) {
                    expect(board.board[row][col]).toBe(firstCellValue + N * row + col);
                }
            }
        });
    });

    describe('Board methods', () => {
        let board;
        let currentPlayer;
        beforeEach(() => {
            const playerName = 'John Doe';
            board = new Board(N);
            currentPlayer = new Player(PLAYER_1_ID, playerName);
        });

        describe('placeMarker', () => {
            const placeValidMarkerTest = (marker, expectedRow, expectedCol) => {
                test(`placerMarker(${marker}) should place marker at [${expectedRow}, ${expectedCol}]`, () => {
                    board.placeMarker(marker, currentPlayer);
                    expect(board.board[expectedRow][expectedCol]).toBe(currentPlayer.id);
                });
            };
            const placeInvalidMarkerTest = (markers, expectedError) => {
                test(`placerMarker(${markers}) should throw ${expectedError.name}`, () => {
                    const placeInvalidMarker = () => markers.forEach(marker => board.placeMarker(marker, currentPlayer));
                    expect(placeInvalidMarker).toThrowError(expectedError);
                });
            };
            placeValidMarkerTest('8', 2, 1);
            placeInvalidMarkerTest([-1], InvalidInputError);
            placeInvalidMarkerTest([0], InvalidInputError);
            placeInvalidMarkerTest(['f'], InvalidInputError);
            placeInvalidMarkerTest([''], InvalidInputError);
            placeInvalidMarkerTest([1, 1], InvalidInputError);
        });
        describe('getWinnerId', () => {
            const getWinnerIdTest = (markers, expectedWinner) => {
                test(`getWinnerId() with board filled at boxes ${markers} should return ${expectedWinner}`, () => {
                    markers.forEach(marker => board.placeMarker(marker, currentPlayer));
                    expect(board.getWinnerId()).toBe(expectedWinner);
                });
            };
            getWinnerIdTest([1, 2, 3], PLAYER_1_ID);
            getWinnerIdTest([1, 4, 7], PLAYER_1_ID);
            getWinnerIdTest([1, 5, 9], PLAYER_1_ID);
            getWinnerIdTest([], null);
            getWinnerIdTest([1], null);
            getWinnerIdTest([1, 2], null);
            getWinnerIdTest([1, 2, 4], null);
        });

        describe('isBoardFull', () => {
            const isBoardFullTest = (markers, expected) => {
                test(`isBoardFull() should return ${expected} with board filled at boxes ${markers}`, () => {
                    markers.forEach(marker => board.placeMarker(marker, currentPlayer));
                    expect(board.isBoardFull()).toBe(expected);
                });
            };

            isBoardFullTest([], false);
            isBoardFullTest([1], false);
            isBoardFullTest([1, 2, 3, 4, 5, 6, 7, 8], false);
            isBoardFullTest([1, 2, 3, 4, 5, 6, 7, 8, 9], true);
        });
    });
});
