import { React, useState } from "react";
import Cell from "./Cell";
import "./grid.css";
import { v4 as uuidv4 } from "uuid";
import { cellsArray } from "./Cell";

const asyncdelay = async function (ms) {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};

const generateGrid = (gridX, gridY) => {
  const gridArray = [];
  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      gridArray.push([i, j]);
    }
  }
  return gridArray;
};

const mazeGenerator = async () => {
  // setcells(cellsArray);
  const startnode = cellsArray[1];
  console.log(startnode);
  await generateMaze(startnode, 5, startnode);
  console.log(cellsArray);
};

const generateMaze = async (prevnode, sec, prenode) => {
  // setcells(cellsArray);
  // await asyncdelay(100);
  prevnode.visited = true;
  console.log(prevnode);

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
  // node.style.backgroundColor = `rgb(${sec},128,128)`;

  let neighbours = prevnode.neighbourIDs.filter(
    (neighbour) => neighbour != false
  );
  neighbours = neighbours.sort(function () {
    return Math.random() - 0.5;
  });
  // console.log(neighbours);
  await neighbours.forEach(async (neighbou) => {
    if (cellsArray[neighbou].visited === false) {
      await generateMaze(cellsArray[neighbou], (sec * 2) % 250, prevnode);
    }
  });
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

  // const [cells, setcells] = useState(cellsArray);

  return (
    <div className="gridcontainer">
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
      <button className="generatemaze" onClick={mazeGenerator}>
        Generate Maze
      </button>
      {/* {console.log(cellsArray)} */}
    </div>
  );
}
