import { useState } from "react";
import { useParams } from "react-router-dom";
import { handleTurn } from "../../logic/handleTurn";
import { markValidMoves } from "../../logic/validLogic";
import { Difficulty, DiscColor, GridValue, MessageType } from "../../types";
import GameBoard from "./GameBoard";
import Popup from "./Popup";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage(): JSX.Element | null {
  const { difficulty, discColor } = useParams<{
    difficulty: Difficulty;
    discColor: DiscColor;
  }>();

  const initialBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  const centerRow = Math.floor(initialBoard.length / 2);
  const centerCol = Math.floor(initialBoard[0].length / 2);
  initialBoard[centerRow - 1][centerCol - 1] = "W";
  initialBoard[centerRow][centerCol] = "W";
  initialBoard[centerRow - 1][centerCol] = "B";
  initialBoard[centerRow][centerCol - 1] = "B";

  const [board, setBoard] = useState<GridValue[][]>(initialBoard);
  const [currentTurn, setCurrentTurn] = useState<DiscColor>("B");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState<MessageType>("");

  if (!difficulty || !discColor) {
    return null;
  }

  const closePopup = () => {
    setPopupVisible(false);
  };
  const updateGame = (updatedBoard: GridValue[][]) => {
    const {
      board: nextUpdatedBoard,
      discColor: nextTurn,
      message,
    } = handleTurn({ board: updatedBoard, currentTurn, discColor });
    if (message !== "") {
      setPopupMessage(message);
      setPopupVisible(true);
    } else {
      setCurrentTurn(nextTurn);
    }
    setBoard(nextUpdatedBoard);
  };

  return (
    <div className="game-page-container">
      <GameBoard board={markValidMoves(currentTurn, board)} currentTurn={currentTurn} onBoardPlay={updateGame} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} currentTurn={currentTurn} />
      <Popup show={popupVisible} messageType={popupMessage} onClose={closePopup} />
    </div>
  );
}

export default GamePage;
