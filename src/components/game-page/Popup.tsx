import { MessageType } from "../../types";
import "../../styles/game-page/Popup.css";

interface PopupProps {
  show: boolean;
  messageType: MessageType;
  onClose: () => void;
}

export default function Popup({ show, messageType, onClose }: PopupProps): JSX.Element {
  const messageContent = messageType.startsWith("skip")
    ? `${messageType.substring(4)} turn has been skipped due to no valid moves`
    : "The game has ended";

  return (
    <div className={`popup popup${show ? "--show" : ""}`}>
      <div className="popup-content">
        {messageType && <span>{messageContent}</span>}
        <button type="button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
}
