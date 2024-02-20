import { DiscColor, GridValue, GridPosition } from "../types";

export function getDiscsToFlip(
  gridPosition: GridPosition,
  currentDiscColor: DiscColor,
  board: GridValue[][]
): GridPosition[] {
  const boardCopy: GridValue[][] = board.map((rowCopy) => [...rowCopy]);
  const discsToFlip: { row: number; col: number }[] = [];
  for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
    for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
      if (!(rowDelta === 0 && colDelta === 0)) {
        let currentRow = gridPosition.row + rowDelta;
        let currentCol = gridPosition.col + colDelta;
        const tempDisc: { row: number; col: number }[] = [];
        while (
          currentRow >= 0 &&
          currentRow < boardCopy.length &&
          currentCol >= 0 &&
          currentCol < boardCopy[currentRow].length &&
          boardCopy[currentRow][currentCol] !== "" &&
          boardCopy[currentRow][currentCol] !== "V" &&
          boardCopy[currentRow][currentCol] !== currentDiscColor
        ) {
          tempDisc.push({ row: currentRow, col: currentCol });
          currentRow += rowDelta;
          currentCol += colDelta;
        }
        if (
          currentRow >= 0 &&
          currentRow < boardCopy.length &&
          currentCol >= 0 &&
          currentCol < boardCopy[currentRow].length &&
          boardCopy[currentRow][currentCol] === currentDiscColor &&
          tempDisc.length > 0
        ) {
          tempDisc.forEach((discToFlip) => {
            discsToFlip.push({ row: discToFlip.row, col: discToFlip.col });
          });
        }
      }
    }
  }
  return discsToFlip;
}

export function markValidMoves(currentDiscColor: DiscColor, board: GridValue[][]): GridValue[][] {
  const boardCopy: GridValue[][] = board.map((rowCopy) => [...rowCopy]);

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (board[row][col] === "" || board[row][col] === "V") {
        const discsToFlip = getDiscsToFlip({ row, col }, currentDiscColor, board);
        if (discsToFlip.length) {
          boardCopy[row][col] = "V";
        } else if (board[row][col] === "V") {
          boardCopy[row][col] = "";
        }
      }
    }
  }

  return boardCopy;
}
