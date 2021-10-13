import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 * 
 * - coords: the y and x coordinates of the cell
 *           used in "flipCellsAroundMe"
 *
 * - handleClick:
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit, coords}) {
  const handleClick = () => {
    flipCellsAroundMe(coords);
  };

  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <div className={classes} onClick={handleClick}></div>;
};

export default Cell;
