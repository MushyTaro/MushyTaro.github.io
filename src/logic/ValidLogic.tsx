import { GridValue } from "../types";

export function checkValid(row: number, col: number, disc: GridValue, board: GridValue[][]) {
  const boardCopy: GridValue[][] = board.map((rowCopy) => [...rowCopy]);
  boardCopy[row][col] = disc;
  const discsToFlip: { row: number; col: number }[] = [];
  for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
    for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
      if (!(rowDelta === 0 && colDelta === 0)) {
        let currentRow = row + rowDelta;
        let currentCol = col + colDelta;
        const tempDisc: { row: number; col: number }[] = [];
        while (
          currentRow >= 0 &&
          currentRow < boardCopy.length &&
          currentCol >= 0 &&
          currentCol < boardCopy[currentRow].length &&
          boardCopy[currentRow][currentCol] !== "" &&
          boardCopy[currentRow][currentCol] !== "V" &&
          boardCopy[currentRow][currentCol] !== disc
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
          boardCopy[currentRow][currentCol] === disc &&
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

export function markValidMoves(player: GridValue, board: GridValue[][]): GridValue[][] {
  const boardCopy: GridValue[][] = board.map((rowCopy) => [...rowCopy]);

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (board[row][col] === "V") {
        boardCopy[row][col] = "";
      }
      if (board[row][col] === "") {
        const isValidMove = checkValid(row, col, player, board);
        if (isValidMove.length) {
          boardCopy[row][col] = "V";
        }
      }
    }
  }

  return boardCopy;
}
