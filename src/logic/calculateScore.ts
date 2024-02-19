import { GridValue, DiscColor } from "../types";

interface CalculateScoreInputs {
  board: GridValue[][];
  playerColor: DiscColor;
}

export default function calculateScore({ board, playerColor }: CalculateScoreInputs): number[] {
  const flattenedBoard = board.flat();
  const blackCount = flattenedBoard.filter((piece) => piece === "B").length;
  const whiteCount = flattenedBoard.filter((piece) => piece === "W").length;
  const scores = playerColor === "W" ? [whiteCount, blackCount] : [blackCount, whiteCount];
  return scores;
}
