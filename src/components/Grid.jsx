/* eslint react/prop-types: 0 */
import Cell from "./Cell";
import "./grid.css";
import { cellsArray } from "./Cell";
import { useState } from "react";

const generateGrid = (gridX, gridY) => {
  const gridArray = [];
  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      gridArray.push([i, j]);
    }
  }
  return gridArray;
};

const generateMaze = async (prevnode, sec, prenode) => {
  prevnode.visited = true;

  let node = document.getElementById(`cell-${prevnode.ID}`);

  if (prenode.ID - prevnode.ID == 1) {
    node.style.borderTop = "white";
  } else if (prenode.ID - prevnode.ID == -1) {
    node.style.borderBottom = "white";
  } else if (prenode.ID - prevnode.ID > 19) {
    node.style.borderLeft = "white";
  } else if (prenode.ID - prevnode.ID < -19) {
    node.style.borderLeft = "white";
  }

  let neighbours = prevnode.neighbourIDs.filter(
    (neighbour) => neighbour != false
  );
  neighbours = neighbours.sort(function () {
    return Math.random() - 0.5;
  });

  neighbours.forEach(async (neighbou) => {
    if (cellsArray[neighbou].visited === false) {
      generateMaze(cellsArray[neighbou], (sec * 2) % 250, prevnode);
    }
  });
};

export default function Grid({ Gridx, Gridy }) {
  const [rerender, setRerender] = useState(0);

  const mazeGenerator = async () => {
    const nodeList = document.getElementsByClassName("cell");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].removeAttribute("style");
    }
    setRerender((prev) => {
      return prev + 1;
    });
    const startnode = cellsArray[1];
    await generateMaze(startnode, 5, startnode);
  };

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
      <h1>Generate maze using DFS algorithm</h1>
      <div className="grid">
        {generateGrid(Gridx, Gridy).map((cellCordinates) => {
          return (
            <Cell
              key={cellCordinates[1] + 1 + cellCordinates[0] * Gridy}
              Xpos={cellCordinates[0]}
              Ypos={cellCordinates[1]}
              gridx={Gridx}
              gridy={Gridy}
              visited={false}
            />
          );
        })}
      </div>

      <button className="button-56" onClick={mazeGenerator} role="button">
        Generate Maze
      </button>
      <p>This is your {rerender} maze</p>
    </div>
  );
}
