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
				<div className="playerCard">Player</div>
				<div className={`playerDiscCard ${playerDiscImage}`}>
					<img src={playerDiscImagePath} alt="Disk"></img>
					<div className="centered">1</div>
				</div>
				<span className="scoreBoardText">Scores</span>
				<div className={`computerDiscCard ${computerDiscImage}`}>
					<img src={computerDiscImagePath} alt="Disk" />
					<div className="centered">1</div>
				</div>
				<div className="computerCard">Computer:{difficulty}</div>
			</div>
		</>
	);
}
