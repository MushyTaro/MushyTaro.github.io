import { GridValue, DiscColor, MessageType } from "../types";
import { markValidMoves } from "./ValidLogic";

interface HandleTurnInputs {
  updatedBoard: GridValue[][];
  currentPlayer: DiscColor;
  discColor: DiscColor;
}
interface HandleTurnOutput {
  nextUpdatedBoard: GridValue[][];
  nextPlayer: DiscColor;
  message: MessageType;
}
export function HandleTurn({ updatedBoard, currentPlayer, discColor }: HandleTurnInputs): HandleTurnOutput {
  const updatedBoardCopy: GridValue[][] = updatedBoard.map((rowCopy) => [...rowCopy]);
  let nextPlayer: DiscColor = currentPlayer === "B" ? "W" : "B";
  let markedUpdatedBoard = markValidMoves(nextPlayer, updatedBoardCopy);
  let containsValidMoves = markedUpdatedBoard.some((row) => row.includes("V"));
  const isBoardNotFull = markedUpdatedBoard.some((row) => row.includes(""));
  if (!containsValidMoves && !isBoardNotFull) {
    return { nextUpdatedBoard: markedUpdatedBoard, nextPlayer, message: "end" };
  }
  if (!containsValidMoves && isBoardNotFull) {
    nextPlayer = currentPlayer === "B" ? "B" : "W";
    markedUpdatedBoard = markValidMoves(nextPlayer, updatedBoardCopy);
    containsValidMoves = markedUpdatedBoard.some((row) => row.includes("V"));
    if (!containsValidMoves) {
      return { nextUpdatedBoard: markedUpdatedBoard, nextPlayer, message: "end" };
    }
    return {
      nextUpdatedBoard: markedUpdatedBoard,
      nextPlayer,
      message: currentPlayer === discColor ? "skip computer" : "skip player",
    };
  }
  return { nextUpdatedBoard: markedUpdatedBoard, nextPlayer, message: "" };
}
