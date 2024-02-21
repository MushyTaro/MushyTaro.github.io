import { MessageType } from "../../types";
import "../../styles/game-page/Popup.css";

interface PopupProps {
  show: boolean;
  messageType: MessageType;
  onClose: () => void;
}

export default function Popup({ show, messageType, onClose }: PopupProps): JSX.Element {
  const messageContents = {
    end: "The game has ended",
    skipComputer: "Computer turn has been skipped due to no valid moves",
    skipPlayer: "Player turn has been skipped due to no valid moves",
  };

  const messageContent = messageType ? messageContents[messageType] : "";

  return (
    <div className={`popup popup${show ? "--show" : ""}`}>
      <div className="popup-content">
        <span>{messageContent}</span>
        <button type="button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
}
