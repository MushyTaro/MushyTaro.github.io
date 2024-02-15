import { GridValue, DiscColor } from "../types";

interface CalculateScoreInputs {
  board: GridValue[][];
  playerColor: DiscColor;
}

export default function CalculateScore({ board, playerColor }: CalculateScoreInputs) {
  let blackCount = 0;
  let whiteCount = 0;

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (board[row][col] === "B") {
        blackCount += 1;
      } else if (board[row][col] === "W") {
        whiteCount += 1;
      }
    }
  }
  const scores = playerColor === "W" ? [whiteCount, blackCount] : [blackCount, whiteCount];
  return scores;
}
