module.exports = {
    printCell(cell) {
        const twoSpaces = '  ';
        const threeSpaces = '   ';
        process.stdout.write(threeSpaces + cell + (isNaN(cell) || cell < 10 ? threeSpaces : twoSpaces));
    },

    printCellDivider() {
        process.stdout.write('|');
    },

    printBottomDivider(length) {
        const idealNumberOfDashes = 8; // Decided from trial and error
        const divider = '-'.repeat(idealNumberOfDashes * length);
        console.log(`\n${divider}`);
    },

    printNewline() {
        process.stdout.write('\n');
    },

    printWinner(winner) {
        if (winner === null) {
            console.log('The game ended in a tie.');
        } else {
            console.log(`Congratulations ${winner.name}! You have won.`);
        }
    },

    /**
     * Writes out the question to the console and returns the reply as a Promise.
     * @param  {String} question The question to ask the player.
     * @return {Promise} Reply of the user.
     */
    readline(question) {
        process.stdout.write(question);
        return new Promise(function (resolve) {
            process.stdin.once('data', function (data) {
                resolve(data.toString().trim());
            });
        });
    },

    exit() {
        process.exit();
    }
};
