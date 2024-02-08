import "../styles/MainPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";

type DiscColor = "Black" | "White";
type Difficulty = "Easy" | "Hard";

function MainPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("Easy");
  const [selectedDiscColor, setSelectedDiscColor] = useState<DiscColor>("White");
  const navigate = useNavigate();

  const handleDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  const handleDiscColor = (discColor: DiscColor) => {
    setSelectedDiscColor(discColor);
  };

  const handleSubmit = () => {
    navigate(`/game/${selectedDifficulty}/${selectedDiscColor}`);
  };

  return (
    <div className="main-page-container">
      <h1 className="game-title ">Reversi</h1>
      <div className="difficulty">
        Difficulty:
        <button
          type="button"
          tabIndex={0}
          className={`difficulty__button difficulty__button${selectedDifficulty === "Easy" ? "--selected" : ""}`}
          onClick={() => handleDifficulty("Easy")}
        >
          Easy
        </button>
        <button
          type="button"
          tabIndex={0}
          className={`difficulty__button difficulty__button${selectedDifficulty === "Hard" ? "--selected" : ""}`}
          onClick={() => handleDifficulty("Hard")}
        >
          Hard
        </button>
      </div>
      <div className="disc-color">
        Play As:
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button  disc-color__button${selectedDiscColor === "White" ? "--selected" : ""}`}
          onClick={() => handleDiscColor("White")}
        >
          <img className="disc-color__button__image" src={white_disc_imagePath} alt="White Disc" />
        </button>
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button disc-color__button${selectedDiscColor === "Black" ? "--selected" : ""}`}
          onClick={() => handleDiscColor("Black")}
        >
          <img className="disc-color__button__image" src={black_disc_imagePath} alt="Black Disc" />
        </button>
      </div>
      <button type="button" className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default MainPage;
