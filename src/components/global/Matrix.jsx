import { getRandomNumber } from "../global/util";

export function createMatrix(width = 8, height = 8) {
  let matrix = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      value: 0,
      x: x,
      y: y,
      state: "closed",
    }))
  );

  return matrix;
}

export function setMines(matrix, width, height, minesCount, clickX, clickY) {
  let i = minesCount;
  while (i > 0) {
    let randomX = getRandomNumber(0, width - 1);
    let randomY = getRandomNumber(0, height - 1);

    if (randomX == clickX && randomY == clickY) {
      continue;
    }

    if (matrix[randomY][randomX].value === 0) {
      matrix[randomY][randomX].value = "*";
      i--;
    }
  }
  searchMinesAround(matrix);
}

function searchMinesAround(matrix) {
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.value === "*") {
        [-1, 0, 1].forEach((yOffset) => {
          [-1, 0, 1].forEach((xOffset) => {
            const neighborY = y + yOffset;
            const neighborX = x + xOffset;
            if (
              neighborY >= 0 &&
              neighborY < matrix.length &&
              neighborX >= 0 &&
              neighborX < row.length &&
              matrix[neighborY][neighborX].value !== "*"
            ) {
              matrix[neighborY][neighborX].value++;
            }
          });
        });
      }
    });
  });
}

export function openAdjacentCells(matrix, y, x) {
  [-1, 0, 1].forEach((yOffset) => {
    [-1, 0, 1].forEach((xOffset) => {
      const neighborY = y + yOffset;
      const neighborX = x + xOffset;
      if (
        neighborY >= 0 &&
        neighborY < matrix.length &&
        neighborX >= 0 &&
        neighborX < matrix[0].length &&
        matrix[neighborY][neighborX].value !== "*" &&
        matrix[neighborY][neighborX].state === "closed"
      ) {
        matrix[neighborY][neighborX].state = "opened";
        if (matrix[neighborY][neighborX].value === 0) {
          openAdjacentCells(matrix, neighborY, neighborX);
        }
      }
    });
  });

  return matrix;
}
