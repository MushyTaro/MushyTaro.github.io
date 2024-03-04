import "../styles/MainPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";
import { fetchAccountData } from "../logic/gameStateLogic";
import { DiscColor } from "../types";
import MainPagePopup from "./MainPagePopup";

function MainPage(): JSX.Element {
  const [selectedDiscColor, setSelectedDiscColor] = useState<DiscColor>("W");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);
  const [errorMessageShow, setErrorMessageShow] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const routeToGamePage = (): void => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("playerDiscColor", selectedDiscColor);
    navigate("/game");
  };

  return (
    <div className="main-page-container">
      {showPopup && (
        <MainPagePopup
          show={showPopup}
          username={username}
          password={password}
          handleUsernameChange={(event) => {
            setErrorMessageShow(false);
            setUsername(event.target.value);
          }}
          handlePasswordChange={(event) => {
            setErrorMessageShow(false);
            setPassword(event.target.value);
          }}
          handleSubmit={(event) => {
            event.preventDefault();
            if (!isNewAccount) {
              (async () => {
                const fetchedData = await fetchAccountData(username);
                if (fetchedData) {
                  if (!fetchedData.isGameEnded) {
                    routeToGamePage();
                  } else {
                    setShowPopup(false);
                  }
                } else {
                  setErrorMessageShow(true);
                }
              })();
            } else {
              (async () => {
                const fetchedData = await fetchAccountData(username);
                if (fetchedData) {
                  setErrorMessageShow(true);
                } else {
                  setShowPopup(false);
                }
              })();
            }
          }}
          handleCreateAccount={() => {
            setErrorMessageShow(false);
            setUsername("");
            setPassword("");
            setIsNewAccount(!isNewAccount);
          }}
          isNewAccount={isNewAccount}
          errorMessageShow={errorMessageShow}
        />
      )}

      <h1 className="game-title ">Reversi</h1>
      <div className="disc-color">
        Play As:
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button  disc-color__button${selectedDiscColor === "W" ? "--selected" : ""}`}
          onClick={() => setSelectedDiscColor("W")}
        >
          <img className="disc-color__button__image" src={white_disc_imagePath} alt="White Disc" />
        </button>
        <button
          type="button"
          tabIndex={0}
          className={`disc-color__button disc-color__button${selectedDiscColor === "B" ? "--selected" : ""}`}
          onClick={() => setSelectedDiscColor("B")}
        >
          <img className="disc-color__button__image" src={black_disc_imagePath} alt="Black Disc" />
        </button>
      </div>
      <button type="button" className="submit-button" onClick={routeToGamePage}>
        Submit
      </button>
    </div>
  );
}

export default MainPage;
