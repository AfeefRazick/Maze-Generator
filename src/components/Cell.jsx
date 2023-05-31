import React from "react";
import "./cell.css";

class Celltemplate {
  constructor(x, y, gridx, gridy) {
    this.X = x;
    this.Y = y;

    this.top = y === 0 ? true : false;
    this.bottom = y === gridy - 1 ? true : false;
    this.left = x === 0 ? true : false;
    this.right = x === gridx - 1 ? true : false;
  }
}
export var cellsArray = {};

export default function Cell({ Xpos, Ypos, gridx, gridy }) {
  let newcell = new Celltemplate(Xpos, Ypos, gridx, gridy);
  let newcellID = Ypos + 1 + Xpos * gridy;
  cellsArray[newcellID] = newcell;
  return <div className="cell "></div>;
}
