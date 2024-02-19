import { useState } from "react";
import { useParams } from "react-router-dom";
import calculateScore from "../../logic/calculateScore";
import { markValidMoves } from "../../logic/validLogic";
import { Difficulty, DiscColor, GridValue } from "../../types";
import GameBoard from "./GameBoard";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage(): JSX.Element {
  const { difficulty = "Easy", discColor = "W" } = useParams<{
    difficulty: Difficulty;
    discColor: DiscColor;
  }>();

  const initialBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  const centerRow = Math.floor(initialBoard.length / 2);
  const centerCol = Math.floor(initialBoard[0].length / 2);
  console.log(initialBoard);
  initialBoard[centerRow - 1][centerCol - 1] = "W";
  initialBoard[centerRow][centerCol] = "W";
  initialBoard[centerRow - 1][centerCol] = "B";
  initialBoard[centerRow][centerCol - 1] = "B";

  const [board, setBoard] = useState<GridValue[][]>(markValidMoves(discColor, initialBoard));
  const [score, setScore] = useState([2, 2]);
  const updateBoard = (updatedBoard: GridValue[][]) => {
    setBoard(markValidMoves(discColor, updatedBoard));
    setScore(calculateScore({ board: updatedBoard, playerColor: discColor }));
    console.log(updatedBoard);
  };
  return (
    <div className="game-page-container">
      <GameBoard board={board} playerTurn={discColor} onBoardPlay={updateBoard} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} score={score} />
    </div>
  );
}

export default GamePage;
