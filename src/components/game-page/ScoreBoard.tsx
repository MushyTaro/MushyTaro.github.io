import { DiscColor, Scores } from "../../types";
import "../../styles/game-page/ScoreBoard.css";

interface ScoreBoardProps {
  playerDiscColor: DiscColor;
  score: Scores;
  currentTurn: DiscColor;
}

export default function ScoreBoard({ playerDiscColor, score, currentTurn }: ScoreBoardProps): JSX.Element {
  const [playerScoreDisc, computerScoreDisc] = playerDiscColor === "W" ? ["--white", ""] : ["", "--white"];
  const [playerTurn, computerTurn] = currentTurn === playerDiscColor ? ["--current", ""] : ["", "--current"];
  return (
    <div className="score-board">
      <div className={`score-board__player score-board__player${playerTurn}`}>
        Player
        <div className={`score-board__player__disc score-board__player__disc${playerScoreDisc}`}>
          {score.playerScore}
        </div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className={`score-board__player score-board__player${computerTurn}`}>
        <div className={`score-board__computer__disc score-board__computer__disc${computerScoreDisc}`}>
          {score.computerScore}
        </div>
        Computer
      </div>
    </div>
  );
}
