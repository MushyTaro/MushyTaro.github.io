import React, { ChangeEvent, FormEvent } from "react";
import "../styles/MainPagePopup.css";

interface PopupProps {
  show: boolean;
  username: string;
  password: string;
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCreateAccount: () => void;
  isNewAccount: boolean;
  errorMessageShow: boolean;
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
  errorMessageShow,
}) => (
  <div className={`main-page-popup main-page-popup${show ? "--show" : ""}`}>
    <div className="main-page-popup-content">
      <h2>{isNewAccount ? "Create Account" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="main-page-popup-content__form-group">
          <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="main-page-popup-content__form-group">
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </div>
        {errorMessageShow && (
          <span className="main-page-popup-content__error-message">
            {isNewAccount ? "❗Account Has been taken" : "❗Username/Password not found"}
          </span>
        )}
        <div className="main-page-popup-content__button-group">
          <button type="button" onClick={handleCreateAccount}>
            {isNewAccount ? "Login" : "Create new account"}
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default MainPagePopup;
