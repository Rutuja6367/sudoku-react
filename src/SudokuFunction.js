//import { Util } from './Util.js';
//export const SudokuFunction = () => {

    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    function isValid(grid, row, col, k) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === k || grid[i][col] === k) {
                return false;
            }
        }

        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === k) {    //startRow is constant ! thus i,j incrementing!
                    return false;
                }
            }
        }
        return true;
    }

    export function solve(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    for (let k = 1; k < 10; k++) {
                        if (isValid(grid, i, j, k)) {
                            grid[i][j] = k;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[i][j] = 0;   //isvalid function fails to put a number -> backtrack and try again(0)
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    export function createSudoku() {

        let puzzle = getRandomSudoku();
        solve(puzzle);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (Math.random() > 0.3) {
                    puzzle[i][j] = 0;
                }
            }
        }

        return puzzle;
    }

    function getRandomSudoku() {
        let puzzle = [];
        for (let i = 0; i < 9; i++) {
            puzzle[i] = Array(9).fill(0);
        }
        for (let i = 0; i < 8; i++) {
            let num = Math.floor(Math.random() * 8) + 1;
            while (!isValid(puzzle, 0, i, num)) {
                num = Math.floor(Math.random() * 8) + 1;
            }
            puzzle[0][i] = num;
        }
        return puzzle;
    }

    let sudoku = createSudoku();
    console.log(sudoku)
    //Util.copyGrid(board,solution);
    solve(sudoku);
    console.log("output :")
    //Util.print2DArray(sudoku);
    // console.log(board);

//export default SudokuFunction;