/**
 * Represents the player of the game.
 */
class Player {

    /**
     * @constructs Player
     * @param  {Number} id
     * @param  {String} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.lastPlacedMarker = -1;
    }

    updateLastPlacedMarker(box) {
        this.lastPlacedMarker = box;
    }
}

module.exports = { Player };
