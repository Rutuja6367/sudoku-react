import React, { useState } from 'react'
import { createSudoku, solve } from './SudokuFunction';

const Sudoku = () => {
    const [board, setboard] = useState(createSudoku());

    const handleChange = (row, col, value) =>{
        if(!/^[1-9]?$/.test(value)) return; //validate 1-9
        let newboard = [...board]; //pass by value | not ref!
        newboard[row][col] = value ? parseInt(value) : 0;
        setboard(newboard);
    };

    const handleSolve = () =>{
        let solveBoard = [...board];
        solve(solveBoard);
        setboard([...solveBoard]);   //REMEBER -> ALWAYS PASS BY VALUE!
        //setboard(solveBoard);    //WRONG -> this is passing by reference!
    }

  return (
    <div>
      <h2>SUDOKU SOLVER</h2>
        <div className='sudkou-grid'>
            {board.map((row,rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell,cellIndex) =>(
                    <input
                        key={cellIndex}
                        type="text"
                        maxLength="1"
                        className="sudoku-cell"
                        value={cell === 0 ? "" : cell}
                            onChange={(e) => handleChange(rowIndex, cellIndex, e.target.value)}
                    />
                    ))}
                </div>
            ))}
        </div>
<button onClick={handleSolve}>SOLVE</button>
    </div>
  )
}

export default Sudoku;
