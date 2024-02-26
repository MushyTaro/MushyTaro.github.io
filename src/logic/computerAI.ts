import { GridPosition, DiscColorBoardState } from "../types";
import calculateScore from "./calculateScore";
import { getDiscsToFlip, getValidMoves } from "./validLogic";

export function getComputerMove({ board, discColor }: DiscColorBoardState): GridPosition {
  const validMoves: GridPosition[] = getValidMoves({ board, discColor });
  let bestMove: GridPosition = { row: -99, col: -99 };
  let bestScore: number = -Infinity;
  for (let i = 0; i < validMoves.length; i += 1) {
    const boardCopy = board.map((row) => [...row]);
    const move = validMoves[i];
    const discsToFlip = getDiscsToFlip(move, { board: boardCopy, discColor });
    boardCopy[move.row][move.col] = discColor;
    discsToFlip.forEach((discToFlip) => {
      boardCopy[discToFlip.row][discToFlip.col] = discColor;
    });
    const score = calculateScore({ discColor: discColor === "B" ? "W" : "B", board: boardCopy });
    if (score.computerScore > bestScore) {
      bestScore = score.computerScore;
      bestMove = move;
    }
  }
  return bestMove;
}
