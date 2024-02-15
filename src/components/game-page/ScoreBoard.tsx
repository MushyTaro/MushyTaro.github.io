import { Difficulty, DiscColor } from "../../types";
import "../../styles/game-page/ScoreBoard.css";

interface ScoreBoardProps {
  difficulty: Difficulty;
  discColor: DiscColor;
  score: number[];
}

export default function ScoreBoard({ difficulty, discColor, score }: ScoreBoardProps) {
  const [playerDiscColor, computerDiscColor] = discColor === "W" ? ["--white", ""] : ["", "--white"];

  return (
    <div className="score-board">
      <div className="score-board__player">
        Player
        <div className={`score-board__player__disc score-board__player__disc${playerDiscColor}`}>{score[0]}</div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className="score-board__computer">
        <div className={`score-board__computer__disc score-board__computer__disc${computerDiscColor}`}>{score[1]}</div>
        Computer:{difficulty}
      </div>
    </div>
  );
}
