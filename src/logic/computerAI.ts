import { DiscColor, GridValue, GridPosition } from "../types";
import calculateScore from "./calculateScore";
import { getDiscsToFlip, markValidMoves } from "./validLogic";

function getValidMoves(board: GridValue[][], discColor: DiscColor): GridPosition[] {
  const validMoves = [];
  const markedValidBoard = markValidMoves(discColor, board);
  for (let row = 0; row < markedValidBoard.length; row += 1) {
    for (let col = 0; col < markedValidBoard[row].length; col += 1) {
      if (markedValidBoard[row][col] === "V") {
        validMoves.push({ row, col });
      }
    }
  }
  return validMoves;
}
export function getGreedyMove(board: GridValue[][], discColor: DiscColor): GridPosition {
  const validMoves: GridPosition[] = getValidMoves(board, discColor);
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
    const score = calculateScore({ discColor: discColor === "B" ? "W" : "B", board });
    if (score.computerScore > bestScore) {
      bestScore = score.computerScore;
      bestMove = move;
    }
  }
  return bestMove;
}
