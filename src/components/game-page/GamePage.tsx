import { useParams } from "react-router-dom";
import { markValidMoves } from "../../logic/ValidLogic";
import { Difficulty, DiscColor, GridValue } from "../../types";
import Board from "./GameBoard";
import "../../styles/game-page/GamePage.css";
import ScoreBoard from "./ScoreBoard";

function GamePage() {
  const { difficulty, discColor } = useParams<{
    difficulty: Difficulty;
    discColor: DiscColor;
  }>();
  if (!difficulty || !discColor) {
    return null;
  }
  const initialBoard: GridValue[][] = Array.from({ length: 8 }, () => Array(8).fill(""));
  const centerRow = Math.floor(initialBoard.length / 2);
  const centerCol = Math.floor(initialBoard[0].length / 2);

  initialBoard[centerRow - 1][centerCol - 1] = "W";
  initialBoard[centerRow][centerCol] = "W";
  initialBoard[centerRow - 1][centerCol] = "B";
  initialBoard[centerRow][centerCol - 1] = "B";

  const playerTurn = discColor;

  const board = markValidMoves(playerTurn, initialBoard);
  return (
    <div className="game-page-container">
      <Board board={board} />
      <ScoreBoard difficulty={difficulty} discColor={discColor} />
    </div>
  );
}

export default GamePage;
