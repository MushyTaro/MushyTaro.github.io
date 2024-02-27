import { GridValue, DiscColor, MessageType, DiscColorBoardState } from "../types";
import { markValidMoves } from "./validLogic";

interface HandleTurnInputs extends DiscColorBoardState {
  currentTurn: DiscColor;
}
interface HandleTurnOutput {
  nextTurn: DiscColor;
  message: MessageType;
}
export default function handleTurn({
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
    return { nextTurn, message: "end" };
  }
  if (!isValidMoveAvailable && isBoardNotFull) {
    nextTurn = currentTurn;
    markedUpdatedBoard = markValidMoves(nextTurn, updatedBoardCopy);
    isValidMoveAvailable = markedUpdatedBoard.some((row) => row.includes("V"));
    if (!isValidMoveAvailable) {
      return { nextTurn, message: "end" };
    }
    return {
      nextTurn,
      message: currentTurn === playerDiscColor ? "skipComputer" : "skipPlayer",
    };
  }
  return { nextTurn, message: "" };
}
