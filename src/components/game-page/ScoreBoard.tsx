import { Difficulty, DiscColor, Scores } from "../../types";
import "../../styles/game-page/ScoreBoard.css";

interface ScoreBoardProps {
  difficulty: Difficulty;
  playerDiscColor: DiscColor;
  score: Scores;
}

export default function ScoreBoard({ difficulty, playerDiscColor, score }: ScoreBoardProps): JSX.Element {
  const [playerScoreDisc, computerScoreDisc] = playerDiscColor === "W" ? ["--white", ""] : ["", "--white"];

  return (
    <div className="score-board">
      <div className="score-board__player">
        Player
        <div className={`score-board__player__disc score-board__player__disc${playerScoreDisc}`}>
          {score.playerScore}
        </div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className="score-board__computer">
        <div className={`score-board__computer__disc score-board__computer__disc${computerScoreDisc}`}>
          {score.computerScore}
        </div>
        Computer:{difficulty}
      </div>
    </div>
  );
}
