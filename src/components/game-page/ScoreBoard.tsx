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
  const [playerDiscImage, computerDiscImage] = discColor === "W" ? ["black", ""] : ["", "black"];
  return (
    <div className="score-board">
      <div className="score-board__player player-name">Player</div>
      <div className={`score-board__player player-disc ${playerDiscImage}`}>
        <img src={playerDiscImagePath} alt="Disk" />
        <div className="centered">2</div>
      </div>
      <span className="score-board__text">Scores</span>
      <div className={`score-board__computer computer-disc ${computerDiscImage}`}>
        <img src={computerDiscImagePath} alt="Disk" />
        <div className="centered">2</div>
      </div>
      <div className="score-board__computer computer-name">Computer:{difficulty}</div>
    </div>
  );
}
