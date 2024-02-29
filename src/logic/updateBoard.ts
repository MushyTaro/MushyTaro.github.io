import { DiscColorBoardState, GridPosition, GridValue } from "../types";
import { getDiscsToFlip } from "./validLogic";

interface GetComputerMoveInputs extends DiscColorBoardState {
  move: GridPosition;
}

export default function updateBoard({ move, board, discColor }: GetComputerMoveInputs): GridValue[][] {
  const boardCopy = board.map((row) => [...row]);
  const discsToFlip = getDiscsToFlip(move, { board: boardCopy, discColor });
  boardCopy[move.row][move.col] = discColor;
  discsToFlip.forEach((discToFlip) => {
    boardCopy[discToFlip.row][discToFlip.col] = discColor;
  });
  return boardCopy;
}
