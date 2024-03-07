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
  const navigate = useNavigate();
  const getPlayerDiscColor = () => {
    const discColor = window.localStorage.getItem("playerDiscColor");
    if (discColor && (discColor === "B" || discColor === "W")) {
      return discColor;
    }
    navigate("/");
    return "W";
  };
  const blankBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  const [board, setBoard] = useState<GridValue[][]>(blankBoard);
  const centerRow = Math.floor(blankBoard.length / 2);
  const centerCol = Math.floor(blankBoard[0].length / 2);
  const initialBoard = structuredClone(blankBoard);
  initialBoard[centerRow - 1][centerCol - 1] = "W";
  initialBoard[centerRow][centerCol] = "W";
  initialBoard[centerRow - 1][centerCol] = "B";
  initialBoard[centerRow][centerCol - 1] = "B";
  const [currentTurn, setCurrentTurn] = useState<DiscColor>("B");
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<MessageType>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [playerDiscColor, setPlayerDiscColor] = useState(getPlayerDiscColor);
  const computerDiscColor: DiscColor = playerDiscColor === "W" ? "B" : "W";
  const overlayVisible = currentTurn === computerDiscColor && !popupVisible;
  const isBoardEmpty = board.every((row) => row.every((cell) => cell === ""));
  useEffect(() => {
    if (overlayVisible && !isFetching) {
      setTimeout(() => {
        const bestMove = getComputerMove({ board, discColor: computerDiscColor });
        const selectedCell: HTMLButtonElement | null = document.querySelector(
          `.gameboard-grid[data-row="${bestMove.row}"][data-col="${bestMove.col}"]`
        );
        if (selectedCell) {
          selectedCell.click();
        }
      }, 1000);
    }
  }, [board, computerDiscColor, currentTurn, isFetching, overlayVisible]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsFetching(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!(playerDiscColor === "B" || playerDiscColor === "W") || !username || !password) {
    navigate("/");
    return null;
  }
  if (isFetching) {
    const registerNewAccount = () => {
      uploadAccount(username, false);
      uploadGameState(username, password, initialBoard, "B", playerDiscColor, "");
      setBoard(initialBoard);
    };
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
          registerNewAccount();
        }
      } else {
        registerNewAccount();
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
      {(overlayVisible || isBoardEmpty) && (
        <div className="overlay">
          <div className="overlay__content">
            <span>{isBoardEmpty ? "Loading Game....." : "The computer is making a move...."}</span>
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
