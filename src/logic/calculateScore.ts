import { DiscColorBoardState, Scores } from "../types";

export default function calculateScore({ discColor: playerDiscColor, board }: DiscColorBoardState): Scores {
  const flattenedBoard = board.flat();
  const blackCount = flattenedBoard.filter((piece) => piece === "B").length;
  const whiteCount = flattenedBoard.filter((piece) => piece === "W").length;
  const scores =
    playerDiscColor === "W"
      ? { playerScore: whiteCount, computerScore: blackCount }
      : { playerScore: blackCount, computerScore: whiteCount };
  return scores;
}
