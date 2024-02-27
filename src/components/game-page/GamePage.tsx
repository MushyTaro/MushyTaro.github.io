import { useState } from "react";
import { useParams } from "react-router-dom";
import calculateScore from "../../logic/calculateScore";
import handleTurn from "../../logic/handleTurn";
import { markValidMoves } from "../../logic/validLogic";
import { DiscColor, GridValue, MessageType } from "../../types";
import GameBoard from "./GameBoard";
import Popup from "./Popup";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage(): JSX.Element | null {
  const { playerDiscColor } = useParams<{
    playerDiscColor: DiscColor;
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

  if (!playerDiscColor) {
    return null;
  }

  const updateGame = (updatedBoard: GridValue[][]): void => {
    const message = handleTurn({
      board: updatedBoard,
      currentTurn,
      discColor: playerDiscColor,
    });
    if (message) {
      setPopupMessage(message);
      setPopupVisible(true);
    } else {
      setCurrentTurn(currentTurn === "B" ? "W" : "B");
    }
    setBoard(updatedBoard);
  };

  return (
    <div className="game-page-container">
      <GameBoard board={markValidMoves(currentTurn, board)} discColor={currentTurn} onBoardPlay={updateGame} />
      <ScoreBoard
        playerDiscColor={playerDiscColor}
        currentTurn={currentTurn}
        score={calculateScore({ discColor: playerDiscColor, board })}
      />
      <Popup
        show={popupVisible}
        messageType={popupMessage}
        onClose={() => {
          setPopupMessage("");
          setPopupVisible(false);
        }}
      />
    </div>
  );
}

export default GamePage;
