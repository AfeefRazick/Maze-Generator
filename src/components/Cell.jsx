import React from "react";
import "./cell.css";

class Celltemplate {
  constructor(x, y, gridx, gridy, visited) {
    this.ID = y + 1 + x * gridy;
    this.visited = visited;
    this.X = x;
    this.Y = y;

    this.neighbourIDs = [
      y === 0 ? false : this.ID - 1, //top//
      y === gridy - 1 ? false : this.ID + 1, //bottom//
      x === 0 ? false : this.ID - gridy, //left//
      x === gridx - 1 ? false : this.ID + gridy, //right//
    ];

    // (this.top = y === 0 ? false : this.ID - 1),
    // (this.bottom = y === gridy - 1 ? false : this.ID + 1),
    // (this.left = x === 0 ? false : this.ID - gridy),
    // (this.right = x === gridx - 1 ? false : this.ID + gridy),
  }
}
export var cellsArray = {};

export default function Cell({ Xpos, Ypos, gridx, gridy, visited }) {
  let newcell = new Celltemplate(Xpos, Ypos, gridx, gridy, visited);
  let newcellID = newcell.ID;
  cellsArray[newcellID] = newcell;
  return <div className="cell" id={`cell-${newcellID}`}></div>;
}
