import { MessageType } from "../../types";
import "../../styles/game-page/Popup.css";

interface PopupProps {
  show: boolean;
  messageType: MessageType;
  onClose: () => void;
}

export default function Popup({ show, messageType, onClose }: PopupProps) {
  let messageContent = "";
  console.log(messageType);
  switch (messageType) {
    case "end":
      messageContent = "The game has ended";
      break;
    case "skip computer":
      messageContent = "Computer turn has been skipped due to no valid moves";
      break;
    case "skip player":
      messageContent = "Player turn has been skipped due to no valid moves";
      break;
    default:
      console.log("Error");
  }

  return (
    <div className={`popup popup${show ? "--show" : ""}`}>
      <div className="popup-content">
        <h1>{messageContent}</h1>
        <button type="button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
}
