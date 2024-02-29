import React, { ChangeEvent, FormEvent } from "react";
import "../styles/game-page/Popup.css";

interface PopupProps {
  show: boolean;
  username: string;
  password: string;
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCreateAccount: () => void;
  isNewAccount: boolean;
}

const MainPagePopup: React.FC<PopupProps> = ({
  show,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  handleCreateAccount,
  isNewAccount,
}) => (
  <div className={`popup popup${show ? "--show" : ""}`}>
    <div className="popup-content">
      <span>{isNewAccount ? "Create Account" : "Login"}</span>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Submit</button>
      </form>
      <p>
        <button type="button" onClick={handleCreateAccount}>
          {isNewAccount ? "Return" : "Create new account"}
        </button>
      </p>
    </div>
  </div>
);

export default MainPagePopup;
