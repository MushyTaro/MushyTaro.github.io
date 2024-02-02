import { useParams, useNavigate } from "react-router-dom";
import Board from "./gameBoard";
import "../styles/gamePage.css";
import ScoreBoard from "./scoreBoard";
function GamePage() {
	const { difficulty, discColor } = useParams<{
		difficulty?: "Easy" | "Hard";
		discColor?: "Black" | "White";
	}>();
	const navigate = useNavigate();
	if (!difficulty || !discColor) {
		navigate("/");
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
