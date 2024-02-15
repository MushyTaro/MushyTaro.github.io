import "../styles/Popup.css";

interface PopupProps {
  show: boolean;
  messageContent: string;
  onClose: () => void;
}

export default function Popup({ show, messageContent, onClose }: PopupProps) {
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
