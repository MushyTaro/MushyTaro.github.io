import { useState } from "react";
import { useParams } from "react-router-dom";
import CalculateScore from "../../logic/CalculateScore";
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
  const [score, setScore] = useState([2, 2]);
  const updateBoard = (updatedBoard: GridValue[][]) => {
    setBoard(markValidMoves(discColor, updatedBoard));
    setScore(CalculateScore({ board: updatedBoard, playerColor: discColor }));
  };
  return (
    <div className="game-page-container">
      <Board board={board} playerTurn={discColor} onBoardPlay={updateBoard} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} score={score} />
    </div>
  );
}

export default GamePage;
