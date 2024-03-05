import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calculateScore from "../../logic/calculateScore";
import { fetchAccountData, fetchGameData, uploadAccount, uploadGameState } from "../../logic/gameStateLogic";
import getComputerMove from "../../logic/getComputerMove";
import handleTurn from "../../logic/handleTurn";
import { markValidMoves } from "../../logic/validLogic";
import { DiscColor, GridValue, MessageType } from "../../types";
import GameBoard from "./GameBoard";
import GameStatusPopup from "./GameStatusPopup";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage(): JSX.Element | null {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
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
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [playerDiscColor, setPlayerDiscColor] = useState(localStorage.getItem("playerDiscColor") as DiscColor);
  const computerDiscColor = (playerDiscColor === "W" ? "B" : "W") as DiscColor;
  const overlayVisible = currentTurn === computerDiscColor && !popupVisible;
  const navigate = useNavigate();
  useEffect(() => {
    if (overlayVisible && !isFetching) {
      setTimeout(() => {
        const bestMove = getComputerMove({ board, discColor: computerDiscColor });
        const selectedCell = document.querySelector(
          `.gameboard-grid[data-row="${bestMove.row}"][data-col="${bestMove.col}"]`
        ) as HTMLButtonElement;
        if (selectedCell) {
          selectedCell.click();
        }
      }, 1000);
    }
  }, [board, computerDiscColor, currentTurn, isFetching, overlayVisible]);

  if (!(playerDiscColor === "B" || playerDiscColor === "W") || !username || !password) {
    navigate("/");
    return null;
  }
  if (isFetching) {
    const fetchGameStateData = async () => {
      const fetchedAccountData = await fetchAccountData(username);
      if (fetchedAccountData && !fetchedAccountData.isGameEnded) {
        const fetchedData = await fetchGameData(username, password);
        if (fetchedData) {
          setBoard(fetchedData.board);
          setCurrentTurn(fetchedData.turn);
          setPlayerDiscColor(fetchedData.playerDiscColor);
          if (fetchedData.message) {
            setPopupMessage(fetchedData.message);
            setPopupVisible(true);
          }
        } else {
          uploadAccount(username, false);
          uploadGameState(username, password, initialBoard, "B", playerDiscColor, "");
        }
      } else {
        uploadAccount(username, false);
        uploadGameState(username, password, initialBoard, "B", playerDiscColor, "");
      }
    };
    fetchGameStateData();
    setIsFetching(false);
  }

  const updateGame = (updatedBoard: GridValue[][]): void => {
    const { nextTurn, message } = handleTurn({
      board: updatedBoard,
      currentTurn,
      discColor: playerDiscColor,
    });
    uploadGameState(username, password, updatedBoard, nextTurn, playerDiscColor, message);
    if (message) {
      setPopupMessage(message);
      setPopupVisible(true);
    } else {
      setCurrentTurn(nextTurn);
    }
    setBoard(updatedBoard);
  };
  return (
    <div className="game-page-container">
      {overlayVisible && (
        <div className="overlay">
          <div className="overlay__content">
            <span>The computer is making a move....</span>
          </div>
        </div>
      )}

      <GameBoard board={markValidMoves(currentTurn, board)} discColor={currentTurn} onBoardPlay={updateGame} />
      <ScoreBoard
        playerDiscColor={playerDiscColor}
        currentTurn={currentTurn}
        score={calculateScore({ discColor: playerDiscColor, board })}
      />
      <GameStatusPopup
        show={popupVisible}
        messageType={popupMessage}
        score={calculateScore({ discColor: playerDiscColor, board })}
        onClose={() => {
          if (popupMessage === "end") {
            setBoard(initialBoard);
          }
          setPopupMessage("");
          setPopupVisible(false);
        }}
        onNavigate={() => {
          uploadAccount(username, true);
          navigate("/");
        }}
      />
    </div>
  );
}

export default GamePage;
