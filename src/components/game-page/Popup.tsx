import { useNavigate } from "react-router-dom";
import { MessageType, Scores } from "../../types";
import "../../styles/game-page/Popup.css";

interface PopupProps {
  show: boolean;
  messageType: MessageType;
  onClose: () => void;
  score: Scores;
}

export default function Popup({ show, messageType, onClose, score }: PopupProps): JSX.Element {
  const navigate = useNavigate();
  const popupContent = messageType.startsWith("skip") ? (
    <div className="popup-content">
      {`${messageType.substring(4)} turn has been skipped due to no valid moves`}
      <button type="button" onClick={onClose}>
        Ok
      </button>
    </div>
  ) : (
    <div className="popup-content">
      {score.playerScore === score.computerScore
        ? "It's a draw! Well played!"
        : score.playerScore > score.computerScore
        ? "Congratulations! You have win the game!"
        : "Looks like the tiles didn't flip in your favor this time. Better luck next time!"}
      <div className="popup--score-title">Scores:</div>
      <div className="popup--score-result">
        <span>{`Player: ${score.playerScore}`}</span>
        <span> - </span>
        <span>{`Computer: ${score.computerScore}`}</span>
      </div>
      <button className="popup--end-button" type="button" onClick={() => navigate("/")}>
        Go to homepage
      </button>
      <button className="popup--end-button" type="button" onClick={onClose}>
        Start a new game
      </button>
    </div>
  );

  return <div className={`popup popup${show ? "--show" : ""}`}>{messageType !== "" && popupContent}</div>;
}
