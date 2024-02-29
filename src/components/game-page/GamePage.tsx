import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import calculateScore from "../../logic/calculateScore";
import { getComputerMove } from "../../logic/computerAI";
import handleTurn from "../../logic/handleTurn";
import { markValidMoves } from "../../logic/validLogic";
import { Difficulty, DiscColor, GridValue, MessageType } from "../../types";
import GameBoard from "./GameBoard";
import Popup from "./Popup";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage(): JSX.Element | null {
  const { difficulty, playerDiscColor } = useParams<{
    difficulty: Difficulty;
    playerDiscColor: DiscColor;
    username: string;
    password: string;
  }>();

  const initialBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  const centerRow = Math.floor(initialBoard.length / 2);
  const centerCol = Math.floor(initialBoard[0].length / 2);
  const computerDiscColor = playerDiscColor === "W" ? "B" : "W";
  initialBoard[centerRow - 1][centerCol - 1] = "W";
  initialBoard[centerRow][centerCol] = "W";
  initialBoard[centerRow - 1][centerCol] = "B";
  initialBoard[centerRow][centerCol - 1] = "B";

  const [board, setBoard] = useState<GridValue[][]>(initialBoard);
  const [currentTurn, setCurrentTurn] = useState<DiscColor>("B");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState<MessageType>("");
  const overlayVisible = currentTurn === computerDiscColor && !popupVisible;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (!username || !password) {
    navigate("/");
  }

  useEffect(() => {
    // Fetch data from the database when the component mounts
    const createAccount = async () => {
      const endpointUrl = "https://fi3si9acoa.execute-api.ap-southeast-1.amazonaws.com/";
      const requestBody = {
        id: `${username}-${password}`,
        data: {
          board: initialBoard,
          turn: "B",
          playerDiscColor,
          message: "",
        },
      };
      // Make a POST request using Fetch
      fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response:", data);
          // Handle the response data here
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors here
        });
    };
    const fetchData = async () => {
      try {
        // Make a fetch request to your backend API endpoint to fetch data from the database
        const endpointUrl = `https://fi3si9acoa.execute-api.ap-southeast-1.amazonaws.com/?id=${username}-${password}`;
        const response = await fetch(endpointUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Update the state with the fetched data
        console.log(data);
        setBoard(data.data.board);
        setCurrentTurn(data.data.turn);
        if (data.data.message) {
          setPopupMessage(data.data.message);
          setPopupVisible(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        createAccount();
        // Handle error
      }
      setIsFetching(false);
    };
    fetchData();
  }, [password, username]);

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
  }, [board, computerDiscColor, currentTurn, overlayVisible]);

  if (!difficulty || !playerDiscColor || !username || !password) {
    return null;
  }

  const updateGame = (updatedBoard: GridValue[][]): void => {
    const { nextTurn, message } = handleTurn({
      board: updatedBoard,
      currentTurn,
      discColor: playerDiscColor,
    });
    const endpointUrl = "https://fi3si9acoa.execute-api.ap-southeast-1.amazonaws.com/";
    const requestBody = {
      id: `${username}-${password}`,
      data: {
        board: updatedBoard,
        turn: nextTurn,
        playerDiscColor,
        message,
      },
    };
    // Make a POST request using Fetch
    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
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
      {overlayVisible && <div className="overlay" />}
      <GameBoard board={markValidMoves(currentTurn, board)} discColor={currentTurn} onBoardPlay={updateGame} />
      <ScoreBoard
        difficulty={difficulty}
        playerDiscColor={playerDiscColor}
        currentTurn={currentTurn}
        score={calculateScore({ discColor: playerDiscColor, board })}
      />
      <Popup
        show={popupVisible}
        messageType={popupMessage}
        score={calculateScore({ discColor: playerDiscColor, board })}
        onClose={() => {
          if (popupMessage === "end") {
            setBoard(initialBoard);
            setCurrentTurn("B");
          }
          setPopupMessage("");
          setPopupVisible(false);
        }}
      />
    </div>
  );
}

export default GamePage;
