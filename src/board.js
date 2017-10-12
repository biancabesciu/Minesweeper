export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBoms = numberOfBombs;
        //represents the size of the game board
        //determins if the game is over or not at the end of each turn
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard () {
        return this._playerBoard;
    }

    //allow the user to flip a tile
    flipTile(rowIndex, columnIndex) {
        const content = this._playerBoard[rowIndex][columnIndex];
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

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
        let numberOfRows = this._bombBoard.length;
        let numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;

        //return the number of bombs in an adjacent neighbor
        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];

            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    hasSafeTiles () {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard( numberOfRows, numberOfColumns) {
        let board = [];
        // for loop iterating through numberOfRows
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            // Create an empty row array
            let row = [];
            // for loop iterating through numberOfColumns
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                // Push the empty spaces onto the row array
                row.push(' ');
            }
            // Push the row onto the board array
            board.push(row);
        }
        // Return the board array
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        // for loop iterating through numberOfRows
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            // Create an empty row array
            let row = [];
            // for loop iterating through numberOfColumns
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                // Push the bombs onto the row array
                row.push(null);
            }
            // Push the row onto the board array
            board.push(row);
        }

        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            // Generate a random row index
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            // Generate a random column index
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

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
}

