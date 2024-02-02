import { useParams } from "react-router-dom";
import Board from "./gameBoard";
import "../styles/gamePage.css";
function GamePage() {
	const { difficulty, discColor } = useParams();
	return (
		<div className="game_page_container">
			<h2>Game Page</h2>
			<p>Difficulty: {difficulty}</p>
			<p>Disc Color: {discColor}</p>
			<Board />
		</div>
	);
}

export default GamePage;
