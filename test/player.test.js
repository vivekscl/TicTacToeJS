const {Player} = require("../src/models/player");
const {PLAYER_1_ID} = require("../src/utils/constants");

describe('Player Class', () => {
    describe('constructor', () => {
        test('should construct a new player', () => {
            const playerName = 'John Doe';
            const player = new Player(PLAYER_1_ID, playerName);
            expect(player.id).toBe(PLAYER_1_ID);
            expect(player.name).toBe(playerName);
        });
    });
});
