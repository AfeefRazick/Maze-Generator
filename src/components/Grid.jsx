import React from "react";
import Cell from "./Cell";
import "./grid.css";
import { v4 as uuidv4 } from "uuid";
import { cellsArray } from "./Cell";

const generateGrid = (gridX, gridY) => {
  const gridArray = [];
  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      gridArray.push([i, j]);
    }
  }
  return gridArray;
};

export default function Grid({ Gridx, Gridy }) {
  let cellwidth = 22;
  document.documentElement.style.setProperty("--cellwidth", `${cellwidth}px`);
  document.documentElement.style.setProperty(
    "--gridwidth",
    `${cellwidth * Gridx + 2}px`
  );
  document.documentElement.style.setProperty(
    "--gridheight",
    `${cellwidth * Gridy + 2}px` //+2 is for border space//
  );
  return (
    <div className="gridcontainer">
      <div className="grid">
        {generateGrid(Gridx, Gridy).map((cellCordinates) => {
          return (
            <Cell
              key={uuidv4()}
              Xpos={cellCordinates[0]}
              Ypos={cellCordinates[1]}
              gridx={Gridx}
              gridy={Gridy}
            />
          );
        })}
      </div>
      {/* {console.log(cellsArray)} */}
    </div>
  );
}
