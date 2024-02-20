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
  let containsValidMoves = markedUpdatedBoard.some((row) => row.includes("V"));
  const isBoardNotFull = markedUpdatedBoard.some((row) => row.includes(""));
  if (!containsValidMoves && !isBoardNotFull) {
    return { board: markedUpdatedBoard, discColor: nextPlayer, message: "end" };
  }
  if (!containsValidMoves && isBoardNotFull) {
    nextPlayer = currentPlayer === "B" ? "B" : "W";
    markedUpdatedBoard = markValidMoves(nextPlayer, updatedBoardCopy);
    containsValidMoves = markedUpdatedBoard.some((row) => row.includes("V"));
    if (!containsValidMoves) {
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
