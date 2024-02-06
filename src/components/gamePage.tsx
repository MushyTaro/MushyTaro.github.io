import { useParams } from "react-router-dom";
import Board from "./gameBoard";
import "../styles/gamePage.css";
import ScoreBoard from "./scoreBoard";
function GamePage() {
	const { difficulty, discColor } = useParams<{
		difficulty?: "Easy" | "Hard";
		discColor?: "Black" | "White";
	}>();
	if (!difficulty || !discColor) {
		return null;
	}
	return (
		<>
			<div className="game_page_container">
				<Board />
				<ScoreBoard difficulty={difficulty} discColor={discColor} />
			</div>
		</>
	);
}

export default GamePage;
