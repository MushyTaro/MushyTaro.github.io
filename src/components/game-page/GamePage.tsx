import { useState } from "react";
import { useParams } from "react-router-dom";
import { HandleTurn } from "../../logic/HandleTurn";
import { markValidMoves } from "../../logic/ValidLogic";
import { Difficulty, DiscColor, GridValue } from "../../types";
import Board from "./GameBoard";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage() {
  const { difficulty = "Easy", discColor = "W" } = useParams<{
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
  const [board, setBoard] = useState<GridValue[][]>(markValidMoves(discColor, initialBoard));
  const [currentPlayer, setCurrentPlayer] = useState<DiscColor>("B");

  const updateGame = (updatedBoard: GridValue[][]) => {
    const { nextUpdatedBoard, nextPlayer, message } = HandleTurn({ updatedBoard, currentPlayer, discColor });
    if (message === "skip") {
      const skipPlayer = currentPlayer === "B" ? "W" : "B";
      setBoard(markValidMoves(skipPlayer, updatedBoard));
      const skipMessage = currentPlayer === discColor ? "Computer has been skipped" : "Player has been skipped";
      setTimeout(() => {
        window.alert(skipMessage);
        setBoard(nextUpdatedBoard);
      }, 0);
    } else if (message === "end") {
      setBoard(nextUpdatedBoard);
      setTimeout(() => {
        window.alert("The game has ended");
      }, 0);
    } else {
      setCurrentPlayer(nextPlayer);
      setBoard(nextUpdatedBoard);
    }
  };
  return (
    <div className="game-page-container">
      <Board board={board} playerTurn={currentPlayer} onBoardPlay={updateGame} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} />
    </div>
  );
}

export default GamePage;
