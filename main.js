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

    const switchTurns = () => { activePlayerIndex = activePlayerIndex === 0 ? 1 : 0; };

    const checkWin = () => {
        const currentBoard = board.getGameboard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6] 
        ]

        return winPatterns.some(pattern => {
            return pattern.every(index => currentBoard[index] === getActivePlayer().marker);
        })
    }

    return { startGame, getActivePlayer, checkWin};
})();