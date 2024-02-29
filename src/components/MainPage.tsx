import "../styles/MainPage.css";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";
import { DiscColor } from "../types";
import MainPagePopup from "./MainPagePopup";

function MainPage(): JSX.Element {
  const [selectedDiscColor, setSelectedDiscColor] = useState<DiscColor>("W");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleDiscColor = (playerDiscColor: DiscColor): void => {
    setSelectedDiscColor(playerDiscColor);
  };

  const [showPopup, setShowPopup] = useState(true);

  const handleSubmit = (): void => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate(`/game/${selectedDiscColor}/`);
  };

  const handleSubmitCredentials = () => {
    if (!isNewAccount) {
      navigate(`/game/${selectedDiscColor}`);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      setShowPopup(false);
    }
  };

  const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const handleCreateAccount = () => {
    setIsNewAccount(!isNewAccount);
  };

  return (
    <div className="main-page-container">
      {showPopup && (
        <MainPagePopup
          show={showPopup}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleSubmitCredentials}
          handleCreateAccount={handleCreateAccount}
          isNewAccount={isNewAccount}
        />
      )}
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
