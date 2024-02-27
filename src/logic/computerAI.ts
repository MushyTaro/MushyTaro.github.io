import { GridPosition, DiscColorBoardState } from "../types";
import calculateScore from "./calculateScore";
import { updateBoard } from "./updateBoard";
import { getValidMoves } from "./validLogic";

export function getComputerMove({ board, discColor }: DiscColorBoardState): GridPosition {
  const validMoves: GridPosition[] = getValidMoves({ board, discColor });
  let bestMove: GridPosition = { row: -1, col: -1 };
  let bestScore: number = -1;
  for (let i = 0; i < validMoves.length; i += 1) {
    const move = validMoves[i];
    const updatedBoard = updateBoard({ move, board, discColor });
    const score = calculateScore({ discColor: discColor === "B" ? "W" : "B", board: updatedBoard });
    if (score.computerScore > bestScore) {
      bestScore = score.computerScore;
      bestMove = move;
    }
  }
  return bestMove;
}
