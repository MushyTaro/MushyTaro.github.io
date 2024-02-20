import { GridValue, DiscColor, MessageType, DiscColorBoardState } from "../types";
import { markValidMoves } from "./validLogic";

interface HandleTurnInputs extends DiscColorBoardState {
  currentPlayer: DiscColor;
}
interface HandleTurnOutput extends DiscColorBoardState {
  message: MessageType;
}
export function handleTurn({ board: updatedBoard, discColor, currentPlayer }: HandleTurnInputs): HandleTurnOutput {
  const updatedBoardCopy: GridValue[][] = updatedBoard.map((rowCopy) => [...rowCopy]);
  let nextPlayer: DiscColor = currentPlayer === "B" ? "W" : "B";
  let markedUpdatedBoard = markValidMoves(nextPlayer, updatedBoardCopy);
  let isValidMoveAvailable = markedUpdatedBoard.some((row) => row.includes("V"));
  const isBoardNotFull = markedUpdatedBoard.some((row) => row.includes(""));
  if (!isValidMoveAvailable && !isBoardNotFull) {
    return { board: markedUpdatedBoard, discColor: nextPlayer, message: "end" };
  }
  if (!isValidMoveAvailable && isBoardNotFull) {
    nextPlayer = currentPlayer === "B" ? "B" : "W";
    markedUpdatedBoard = markValidMoves(nextPlayer, updatedBoardCopy);
    isValidMoveAvailable = markedUpdatedBoard.some((row) => row.includes("V"));
    if (!isValidMoveAvailable) {
      return { board: markedUpdatedBoard, discColor: nextPlayer, message: "end" };
    }
    return {
      board: markedUpdatedBoard,
      discColor: nextPlayer,
      message: currentPlayer === discColor ? "skip computer" : "skip player",
    };
  }
  return { board: markedUpdatedBoard, discColor: nextPlayer, message: "" };
}
