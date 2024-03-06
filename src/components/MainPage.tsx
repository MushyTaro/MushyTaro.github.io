import "../styles/MainPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import black_disc_imagePath from "../assets/black-disc.png";
import white_disc_imagePath from "../assets/white-disc.png";
import { fetchAccountData } from "../logic/gameStateLogic";
import validateCredentials from "../logic/validateCredentials";
import { CtaType, DiscColor } from "../types";
import MainPagePopup from "./MainPagePopup";

function MainPage(): JSX.Element {
  const [selectedDiscColor, setSelectedDiscColor] = useState<DiscColor>("W");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ctaType, setCtaType] = useState<CtaType>("login");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
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
          handleChangeUsername={(event) => {
            setShowErrorMessage(false);
            setUsername(event.target.value);
          }}
          handleChangePassword={(event) => {
            setShowErrorMessage(false);
            setPassword(event.target.value);
          }}
          handleSubmit={async (event) => {
            event.preventDefault();
            if (validateCredentials(username, password) === "valid") {
              if (ctaType === "login") {
                const fetchedData = await fetchAccountData(username);
                if (fetchedData) {
                  if (!fetchedData.isGameEnded) {
                    routeToGamePage();
                  } else {
                    setShowPopup(false);
                  }
                } else {
                  setShowErrorMessage(true);
                }
              } else {
                const fetchedData = await fetchAccountData(username);
                if (fetchedData) {
                  setShowErrorMessage(true);
                } else {
                  setShowPopup(false);
                }
              }
            } else {
              setShowErrorMessage(true);
            }
          }}
          handleChangeForm={() => {
            setShowErrorMessage(false);
            setUsername("");
            setPassword("");
            setCtaType(ctaType === "login" ? "register" : "login");
          }}
          ctaType={ctaType}
          showErrorMessage={showErrorMessage}
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
