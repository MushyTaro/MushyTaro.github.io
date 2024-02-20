import { useState } from "react";
import { useParams } from "react-router-dom";
import { markValidMoves } from "../../logic/validLogic";
import { Difficulty, DiscColor, GridValue } from "../../types";
import GameBoard from "./GameBoard";
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

  if (!difficulty || !discColor) {
    return null;
  }

  const updateBoard = (updatedBoard: GridValue[][]): void => {
    setBoard(updatedBoard);
  };

  return (
    <div className="game-page-container">
      <GameBoard board={markValidMoves(discColor, board)} playerTurn={discColor} onBoardPlay={updateBoard} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} />
    </div>
  );
}

export default GamePage;
