import { Difficulty, DiscColor } from "../../types";
import "../../styles/game-page/ScoreBoard.css";

interface ScoreBoardProps {
  difficulty: Difficulty;
  discColor: DiscColor;
  currentPlayer: DiscColor;
}

export default function ScoreBoard({ difficulty, discColor, currentPlayer }: ScoreBoardProps) {
  const [playerDiscColor, computerDiscColor] = discColor === "W" ? ["--white", ""] : ["", "--white"];
  // let [currentPlayerCard, currentComputerCard] = currentPlayer === "W" ? ["--current", ""] : ["", "--current"];
  return (
    <div className="score-board">
      <div className={`score-board__player score-board__player${currentPlayer === discColor ? "--current" : ""}`}>
        Player
        <div className={`score-board__player__disc score-board__player__disc${playerDiscColor}`}>2</div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className={`score-board__computer score-board__computer${currentPlayer === discColor ? "" : "--current"}`}>
        <div className={`score-board__computer__disc score-board__computer__disc${computerDiscColor}`}>2</div>
        Computer:{difficulty}
      </div>
    </div>
  );
}
