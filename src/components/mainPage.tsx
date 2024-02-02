import "../styles/mainPage.css";
import white_disc_imagePath from "../assets/white-disc.png";
import black_disc_imagePath from "../assets/black-disc.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
	const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
	const [selectedDiscColor, setSelectedDiscColor] = useState("White");
	const navigate = useNavigate();

	const handleDifficulty = (difficulty: "Easy" | "Hard") => {
		setSelectedDifficulty(difficulty);
	};
	const handleDiscColor = (discColor: "Black" | "White") => {
		setSelectedDiscColor(discColor);
	};

	const handleSubmit = () => {
		navigate(`/game/${selectedDifficulty}/${selectedDiscColor}`);
	};

	return (
		<>
			<div className="main_page_container">
				<h1 className="game_title">Reversi</h1>
				<div className="difficulty">
					Difficulty:
					<button
						className={`difficultyButton ${
							selectedDifficulty === "Easy" ? "selected" : ""
						}`}
						onClick={() => handleDifficulty("Easy")}>
						Easy
					</button>
					<button
						className={`difficultyButton ${
							selectedDifficulty === "Hard" ? "selected" : ""
						}`}
						onClick={() => handleDifficulty("Hard")}>
						Hard
					</button>
				</div>
				<div className="select_disc_color">
					Play As:
					<div
						className={`discColorButtonWrapper ${
							selectedDiscColor === "White" ? "selected" : ""
						}`}
						onClick={() => handleDiscColor("White")}>
						<img
							className="discColorButton"
							src={white_disc_imagePath}
							alt="White Disc"></img>
					</div>
					<div
						className={`discColorButtonWrapper ${
							selectedDiscColor === "Black" ? "selected" : ""
						}`}
						onClick={() => handleDiscColor("Black")}>
						<img
							className="discColorButton"
							src={black_disc_imagePath}
							alt="Black Disc"></img>
					</div>
				</div>
				<button className="submitButton" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</>
	);
}

export default MainPage;
