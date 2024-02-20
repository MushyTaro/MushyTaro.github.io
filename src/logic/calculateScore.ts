import { GridValue, DiscColor } from "../types";

interface CalculateScoreInputs {
  board: GridValue[][];
  playerColor: DiscColor;
}

export default function calculateScore({ board, playerColor }: CalculateScoreInputs): {
  playerScore: number;
  computerScore: number;
} {
  const flattenedBoard = board.flat();
  const blackCount = flattenedBoard.filter((piece) => piece === "B").length;
  const whiteCount = flattenedBoard.filter((piece) => piece === "W").length;
  const scores =
    playerColor === "W"
      ? { playerScore: whiteCount, computerScore: blackCount }
      : { playerScore: blackCount, computerScore: whiteCount };
  return scores;
}
