const {TicTacToe} = require("../src/models/tic-tac-toe");
const {PLAYER_1_ID, PLAYER_2_ID} = require("../src/utils/constants");

describe('TicTacToe Class', () => {
    describe('constructor', () => {
        test('should construct a new TicTacToe game', () => {
            const player1Name = 'John Doe';
            const player2Name = 'Alex Doe';
            const ticTacToeGame = new TicTacToe(player1Name, player2Name);
            expect(ticTacToeGame.currentPlayer.id).toBe(PLAYER_1_ID);
            expect(ticTacToeGame.currentPlayer.name).toBe(player1Name);
            expect(ticTacToeGame.isGameOver).toBe(false);
            expect(ticTacToeGame.winner).toBe(null);
        });
    });

    describe('TicTacToe methods', () => {
        let ticTacToeGame;
        beforeEach(() => {
            const player1Name = 'John Doe';
            const player2Name = 'Alex Doe';
            ticTacToeGame = new TicTacToe(player1Name, player2Name);
        });

        describe('updateGameState', () => {
            const updateGameStateTest = (markers, expectedIds, expectedWinnerId, expectedIsGameOver) => {
                test(`updateGameState() should update board to have ${expectedIds} at ${markers} with winner as 
                ${expectedWinnerId} and isGameOver as ${expectedIsGameOver}`, () => {
                    markers.forEach((marker, index) => {
                        ticTacToeGame.placeMarker(marker);
                        ticTacToeGame.updateGameState();
                        const [row, col] = ticTacToeGame.gameBoard.boxToCellMap[marker];
                        expect(ticTacToeGame.gameBoard.board[row][col]).toBe(expectedIds[index]);
                    });
                    if (expectedWinnerId === null) {
                        expect(ticTacToeGame.winner).toBeNull();
                    } else {
                        expect(ticTacToeGame.winner.id).toBe(expectedWinnerId);
                    }
                    expect(ticTacToeGame.isGameOver).toBe(expectedIsGameOver);
                });
            };
            // Unfinished game
            updateGameStateTest([1, 5, 9], [PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID], null, false);
            // Player 1 win
            updateGameStateTest([1, 4, 5, 7, 9],
                [PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID], PLAYER_1_ID, true);
            // Player 2 win
            updateGameStateTest([2, 4, 5, 7, 6, 1],
                [PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID], PLAYER_2_ID, true);
            // Draw
            updateGameStateTest([1, 4, 7, 5, 6, 2, 8, 9, 3],
                [PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID, PLAYER_2_ID, PLAYER_1_ID], null, true);

        });
    });
});
