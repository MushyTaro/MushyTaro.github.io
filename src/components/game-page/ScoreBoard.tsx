import black_disc_imagePath from "../../assets/black-disc.png";
import white_disc_imagePath from "../../assets/white-disc.png";
import { Difficulty, DiscColor } from "../../type";

interface ScoreBoardProps {
  difficulty: Difficulty;
  discColor: DiscColor;
}

export default function ScoreBoard({ difficulty, discColor }: ScoreBoardProps) {
  const [playerDiscImagePath, computerDiscImagePath] =
    discColor === "B" ? [black_disc_imagePath, white_disc_imagePath] : [white_disc_imagePath, black_disc_imagePath];

  const [playerDiscColor, computerDiscColor] = discColor === "W" ? ["black", ""] : ["", "black"];

  return (
    <div className="score-board">
      <div className="score-board__player">Player</div>
      <div className={`score-board__player ${playerDiscColor}`}>
        <img src={playerDiscImagePath} alt="ScoreBoard Disk" />
        <div className="centered">2</div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className={`score-board__computer ${computerDiscColor}`}>
        <img src={computerDiscImagePath} alt="ScoreBoard Disk" />
        <div className="centered">2</div>
      </div>
      <div className="score-board__computer">Computer:{difficulty}</div>
    </div>
  );
}
