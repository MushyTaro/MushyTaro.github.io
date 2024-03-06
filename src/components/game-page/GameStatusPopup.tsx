import { MessageType, Scores } from "../../types";
import "../../styles/game-page/GameStatusPopup.css";

interface PopupProps {
  show: boolean;
  messageType: MessageType;
  onClose: () => void;
  onNavigate: () => void;
  score: Scores;
}

export default function GameStatusPopup({ show, messageType, onClose, onNavigate, score }: PopupProps): JSX.Element {
  const popupContent = messageType.startsWith("skip") ? (
    <div className="game-page-popup-content">
      <span>{`${messageType.substring(
        4
      )} turn has been skipped due to no available moves to flip any opponent's discs`}</span>
      <button type="button" className="game-page-popup-button" onClick={onClose}>
        Ok
      </button>
    </div>
  ) : (
    <div className="game-page-popup-content">
      <span>
        {score.playerScore === score.computerScore
          ? "It's a draw! Well played!"
          : score.playerScore > score.computerScore
          ? "Congratulations! You have win the game!"
          : "Looks like the tiles didn't flip in your favor this time. Better luck next time!"}
      </span>
      <div className="game-page-popup--score-title">Scores:</div>
      <div className="game-page-popup--score-result">
        <span>{`Player: ${score.playerScore}`}</span>
        <span> - </span>
        <span>{`Computer: ${score.computerScore}`}</span>
      </div>
      <button className="game-page-popup-button" type="button" onClick={onClose}>
        Start a new game
      </button>
      <button className="game-page-popup--end-button--route" type="button" onClick={onNavigate}>
        Go to homepage
      </button>
    </div>
  );

  return <div className={`game-page-popup game-page-popup${show ? "--show" : ""}`}>{popupContent}</div>;
}
