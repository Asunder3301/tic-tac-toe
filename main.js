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

function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => { score++ }

    return {name, marker, getScore, increaseScore};
}

const gameController = (() => {
    let players = [];
    let activePlayerIndex = 0;
    let gameOver = false;

    const startGame = (player1, player2) => {
        players = [
            createPlayer(player1, "X"),
            createPlayer(player2, "O")
        ];

        activePlayerIndex = 0;
        gameOver = false;
        board.resetBoard();
    }

    const getActivePlayer = () => players[activePlayerIndex];

    return { startGame, getActivePlayer };
})();