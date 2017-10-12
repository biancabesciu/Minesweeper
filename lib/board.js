'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBoms = numberOfBombs;
        //represents the size of the game board
        //determins if the game is over or not at the end of each turn
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',


        //allow the user to flip a tile
        value: function flipTile(rowIndex, columnIndex) {
            var content = this._playerBoard[rowIndex][columnIndex];
            //check if there is not enpty string
            if (content !== ' ') {
                console.log('This tile has already been flipped!');
                return;
                //you want to display bomb on player board in case of bomb apear on flipped tile
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }
            this._numberOfTiles--;
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;

            //return the number of bombs in an adjacent neighbor
            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColumnIndex = columnIndex + offset[1];

                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            // for loop iterating through numberOfRows
            for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
                // Create an empty row array
                var row = [];
                // for loop iterating through numberOfColumns
                for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                    // Push the empty spaces onto the row array
                    row.push(' ');
                }
                // Push the row onto the board array
                board.push(row);
            }
            // Return the board array
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            // for loop iterating through numberOfRows
            for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
                // Create an empty row array
                var row = [];
                // for loop iterating through numberOfColumns
                for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                    // Push the bombs onto the row array
                    row.push(null);
                }
                // Push the row onto the board array
                board.push(row);
            }

            var numberOfBombsPlaced = 0;
            while (numberOfBombsPlaced < numberOfBombs) {
                // Generate a random row index
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                // Generate a random column index
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    // Place the bomb at that row and columns
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    // Increment numberOfBombsPlaced
                    numberOfBombsPlaced++;
                }
            }
            // Return the board array
            return board;
        }
    }]);

    return Board;
}();