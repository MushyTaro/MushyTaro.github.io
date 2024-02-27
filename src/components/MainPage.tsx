import "../styles/MainPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";
import { DiscColor } from "../types";

function MainPage(): JSX.Element {
  const [selectedDiscColor, setSelectedDiscColor] = useState<DiscColor>("W");
  const navigate = useNavigate();

  const handleDiscColor = (playerDiscColor: DiscColor): void => {
    setSelectedDiscColor(playerDiscColor);
  };

  const handleSubmit = (): void => {
    navigate(`/game/${selectedDiscColor}`);
  };

  return (
    <div className="main-page-container">
      <h1 className="game-title ">Reversi</h1>
      <div className="disc-color">
        Play As:
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button  disc-color__button${selectedDiscColor === "W" ? "--selected" : ""}`}
          onClick={() => handleDiscColor("W")}
        >
          <img className="disc-color__button__image" src={white_disc_imagePath} alt="White Disc" />
        </button>
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button disc-color__button${selectedDiscColor === "B" ? "--selected" : ""}`}
          onClick={() => handleDiscColor("B")}
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
