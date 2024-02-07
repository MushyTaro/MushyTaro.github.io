import { useParams } from "react-router-dom";
import { Difficulty, DiscColor } from "../../type";
import Board from "./GameBoard";
import "../../styles/GamePage1.css";
import ScoreBoard from "./ScoreBoard";

function GamePage() {
  const { difficulty, discColor } = useParams<{
    difficulty: Difficulty;
    discColor: DiscColor;
  }>();
  if (!difficulty || !discColor) {
    return null;
  }
  return (
    <div className="game-page-container">
      <Board />
      <ScoreBoard difficulty={difficulty} discColor={discColor} />
    </div>
  );
}

export default GamePage;
