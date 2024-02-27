import { GridPosition, DiscColorBoardState } from "../types";
import calculateScore from "./calculateScore";
import { updateBoard } from "./updateBoard";
import { markValidMoves } from "./validLogic";

export function getComputerMove({ board, discColor }: DiscColorBoardState): GridPosition {
  const validMoves: GridPosition[] = [];
  const markedValidBoard = markValidMoves(discColor, board);
  markedValidBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === "V") {
        validMoves.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  let bestMove: GridPosition = { row: -1, col: -1 };
  let bestScore: number = -1;
  validMoves.forEach((move) => {
    const updatedBoard = updateBoard({ move, board, discColor });
    const score = calculateScore({ discColor: discColor === "B" ? "W" : "B", board: updatedBoard });
    if (score.computerScore > bestScore) {
      bestScore = score.computerScore;
      bestMove = move;
    }
  });
  return bestMove;
}
