import white_disc_imagePath from "../assets/white-disc.png";
import black_disc_imagePath from "../assets/black-disc.png";
interface ScoreBoardProps {
	difficulty: "Easy" | "Hard";
	discColor: "Black" | "White";
}
export default function ScoreBoard({ difficulty, discColor }: ScoreBoardProps) {
	const [playerDiscImagePath, computerDiscImagePath] =
		discColor === "Black"
			? [black_disc_imagePath, white_disc_imagePath]
			: [white_disc_imagePath, black_disc_imagePath];
	const [playerDiscImage, computerDiscImage] =
		discColor === "White" ? ["black", ""] : ["", "black"];
	return (
		<>
			<div className="scoreBoard">
				<div className="playerCard playerNameCard">Player</div>
				<div className={`playerCard playerDiscCard ${playerDiscImage}`}>
					<img src={playerDiscImagePath} alt="Disk"></img>
					<div className="centered">2</div>
				</div>
				<span className="scoreBoardText">Scores</span>
				<div className={`computerCard computerDiscCard ${computerDiscImage}`}>
					<img src={computerDiscImagePath} alt="Disk" />
					<div className="centered">2</div>
				</div>
				<div className="computerCard computerNameCard">
					Computer:{difficulty}
				</div>
			</div>
		</>
	);
}
