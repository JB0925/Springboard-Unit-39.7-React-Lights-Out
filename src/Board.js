import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        let randomNum = Math.random();
        randomNum > chanceLightStartsOn ? row.push(true) : row.push(false);
      };
      initialBoard.push(row);
    };
    return initialBoard;
  };
  
  // check to see if the game has been won by checking to see
  // if every cell has the value of false
  function hasWon() {
    return board.every(row => row.every(cell => cell === false));
  };
  
  // updating state in a way that causes a rerender of the component
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      
      let updatedBoard = [...oldBoard];
      flipCell(y, x, updatedBoard);
      flipCell(y-1, x, updatedBoard);
      flipCell(y+1, x, updatedBoard);
      flipCell(y, x-1, updatedBoard);
      flipCell(y, x+1, updatedBoard);
      return updatedBoard;
    });
  }
  
  const cells = board.map((row,i) => 
                          row.map((cell,j) => 
                                  <Cell 
                                  flipCellsAroundMe={flipCellsAround}
                                  isLit={cell}
                                  coords={`${j}-${i}`} />));

  return (
    hasWon() ? 
    <h1 style={{color: "#f7cf6c", fontSize: "5rem"}}>Congrats, you WON!</h1>
    :
    <div className="Board-main">
      <div className="Board-directions">
        <h3>How to Play:</h3>
        <p>Click a box. It will turn off or on the other boxes around it.
          Keep clicking until you turn off all of the boxes! The boxes are
          off when they are all turned gray!
        </p>
      </div>
      <div className="Board">
        {cells}
      </div> 
    </div>
  );
};

Board.defaultProps = {
  nrows: 3,
  ncols: 3,
  chanceLightStartsOn: 0.5
};

export default Board;