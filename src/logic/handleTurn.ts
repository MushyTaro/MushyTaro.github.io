import { GridValue, DiscColor, MessageType, DiscColorBoardState } from "../types";
import { markValidMoves } from "./validLogic";

interface HandleTurnInputs extends DiscColorBoardState {
  currentTurn: DiscColor;
}
interface HandleTurnOutput extends DiscColorBoardState {
  message: MessageType;
}
export function handleTurn({
  board: updatedBoard,
  discColor: playerDiscColor,
  currentTurn,
}: HandleTurnInputs): HandleTurnOutput {
  const updatedBoardCopy: GridValue[][] = updatedBoard.map((rowCopy) => [...rowCopy]);
  let nextTurn: DiscColor = currentTurn === "B" ? "W" : "B";
  let markedUpdatedBoard = markValidMoves(nextTurn, updatedBoardCopy);
  let isValidMoveAvailable = markedUpdatedBoard.some((row) => row.includes("V"));
  const isBoardNotFull = markedUpdatedBoard.some((row) => row.includes(""));
  if (!isValidMoveAvailable && !isBoardNotFull) {
    return { board: markedUpdatedBoard, discColor: nextTurn, message: "end" };
  }
  if (!isValidMoveAvailable && isBoardNotFull) {
    nextTurn = currentTurn === "B" ? "B" : "W";
    markedUpdatedBoard = markValidMoves(nextTurn, updatedBoardCopy);
    isValidMoveAvailable = markedUpdatedBoard.some((row) => row.includes("V"));
    if (!isValidMoveAvailable) {
      return { board: markedUpdatedBoard, discColor: nextTurn, message: "end" };
    }
    return {
      board: markedUpdatedBoard,
      discColor: nextTurn,
      message: currentTurn === playerDiscColor ? "skip computer" : "skip player",
    };
  }
  return { board: markedUpdatedBoard, discColor: nextTurn, message: "" };
}
