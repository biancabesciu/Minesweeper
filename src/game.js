// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`


import {Board} from './board';

class Game {
    constructor(numberOfRows,numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove (rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Game Over!');
            this._board.print();
        } else if (!this._board.hasSafeTiles) {
            console.log("Congratulations. You've won");
        } else {
            console.log('Current Board: ');
            this._board.print();
        }
    }
}

const g = new Game(3, 3, 3);
g.playMove(0,2);

// let playerBoard = generatePlayerBoard(3,4);
// let bombBoard = generateBombBoard(3, 4, 5);
//
// console.log('Player Board: ');
// printBoard(playerBoard);
// console.log('Bomb Board: ');
// printBoard(bombBoard);
//
// flipTile(playerBoard, bombBoard, 1,1);
// console.log('Updated Player Board: ');
// printBoard(playerBoard);