const board = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const getGameboard = () => gameboard;

    const makeMove = (index, marker) => {
        if(gameboard[index] === "") {
            gameboard[index] = marker;
            //Confirm move was successful
            return true;
        }
        //Cell is populated
        return false;
    }

    const resetBoard = () => {
        for(let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
        }
    }

    return { getGameboard, makeMove, resetBoard };
})();

const game = ((player1, player2) => {
    
})();

function createPlayer(name) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => { score++ }

    return {name, getScore, increaseScore};
}