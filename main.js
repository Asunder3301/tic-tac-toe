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

function createPlayer(name, marker) { return {name, marker}; }

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

    const checkTie = () => {
        return board.getGameboard().every(cell => cell !== "");
    }

    const playTurn = (index) => {
        if(gameOver) { return "Game Over!" }

        const successfulMove = board.makeMove(index, getActivePlayer().marker);
        if(!successfulMove) { return "Invalid move!" }

        if (checkWin()) {
            gameOver = true;
            return `${getActivePlayer().name} wins!`;
        }

        if (checkTie()) {
            gameOver = true;
            return "It is a tie!";
        }

        switchTurns();
        return `${getActivePlayer().name}'s turn.`;
    }

    const restartGame = () => {
        activePlayerIndex = 0;
        gameOver = false;
        board.resetBoard();
    }
    
    return { startGame, playTurn, restartGame };
})();

const handleDOM = (() => {
    const handleCellClick = (event) => {
        const index = event.target.dataset.index;

        const turnResult = gameController.playTurn(index);
        displayMessage(turnResult);

        displayBoard();

        if(turnResult !== "Invalid move!" && turnResult !== "Game Over!") { removeListner(index); }
    }

    const getPlayerNames = () => {
        const form = document.getElementById("form");

        const formData = new FormData(form);
        const playerNames = Object.fromEntries(formData);

        return playerNames
    }

    const removeButton = () => {
        const button = document.getElementById("start-btn");
        button.style.display = "none"
    }

    const displayBoard = () => {
        const cells = document.querySelectorAll(".cell");
        const currentBoard = board.getGameboard();

        cells.forEach((cell, index) => {
            cell.textContent = currentBoard[index];
            cell.dataset.index = index;
        });
    }

    const addListners = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.addEventListener("click", handleCellClick);
        });
    }

    const removeListner = (index) => {
        const cells = document.querySelectorAll(".cell");
        const target = cells[index];
        if(target) {
            target.removeEventListener("click", handleCellClick);
        }
    }

    const displayMessage = (message) => {
        const display = document.getElementById("display");
        display.textContent = "";

        display.textContent = message;
    } 

    const handleStart = () => {
        const players = getPlayerNames();
        gameController.startGame(players['player-1'], players['player-2']);
        removeButton();
        displayBoard();
        addListners();

        const dialog = document.getElementById("form-container");
        dialog.close();
    }

    const handleReset = () => {
        const display = document.getElementById("display");
        display.textContent = "Game reset!";
        gameController.restartGame();
        displayBoard();
        addListners();
    }

    return {handleStart, handleReset }
})();

const gaemForm = document.getElementById("form");
gaemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleDOM.handleStart();
})

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", handleDOM.handleReset);