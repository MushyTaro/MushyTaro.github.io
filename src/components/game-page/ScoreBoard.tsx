import { Difficulty, DiscColor } from "../../types";
import "../../styles/game-page/ScoreBoard.css";

interface ScoreBoardProps {
  difficulty: Difficulty;
  discColor: DiscColor;
  currentTurn: DiscColor;
}

export default function ScoreBoard({ difficulty, discColor, currentTurn }: ScoreBoardProps): JSX.Element {
  const [playerDiscColor, computerDiscColor] = discColor === "W" ? ["--white", ""] : ["", "--white"];
  const [playerTurn, computerTurn] = currentTurn === discColor ? ["--current", ""] : ["", "--current"];
  return (
    <div className="score-board">
      <div className={`score-board__player score-board__player${playerTurn}`}>
        Player
        <div className={`score-board__player__disc score-board__player__disc${playerDiscColor}`}>2</div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className={`score-board__computer score-board__computer${computerTurn}`}>
        <div className={`score-board__computer__disc score-board__computer__disc${computerDiscColor}`}>2</div>
        Computer:{difficulty}
      </div>
    </div>
  );
}
