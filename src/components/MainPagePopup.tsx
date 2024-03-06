import React from "react";
import "../styles/MainPagePopup.css";
import validateCredentials from "../logic/validateCredentials";
import { CtaType } from "../types";

interface PopupProps {
  show: boolean;
  username: string;
  password: string;
  handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleChangePassword: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  handleChangeForm: () => void;
  ctaType: CtaType;
  showErrorMessage: boolean;
}

const MainPagePopup: React.FC<PopupProps> = ({
  show,
  username,
  password,
  handleChangeUsername,
  handleChangePassword,
  handleSubmit,
  handleChangeForm,
  ctaType,
  showErrorMessage,
}) => (
  <div className={`main-page-popup main-page-popup${show ? "--show" : ""}`}>
    <div className="main-page-popup-content">
      <h2>{ctaType === "register" ? "Create Account" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="main-page-popup-content__form-group">
          <input type="text" placeholder="Username" value={username} onChange={handleChangeUsername} />
        </div>
        <div className="main-page-popup-content__form-group">
          <input type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
        </div>
        {showErrorMessage && (
          <span className="main-page-popup-content__error-message">
            {validateCredentials(username, password) === "format error"
              ? "❗Username/Password may only include alphabetical letters and numbers only"
              : validateCredentials(username, password) === "length error"
              ? "❗Username/Password must be 3-15 characters long"
              : ctaType === "login"
              ? "❗Incorrect username/password"
              : "❗Username Has been taken"}
          </span>
        )}
        <div className="main-page-popup-content__button-group">
          <button type="submit" className="main-page-popup__end-button">
            {ctaType === "register" ? "Create new account" : "Login"}
          </button>
          <button type="button" className="main-page-popup__end-button--route" onClick={handleChangeForm}>
            {ctaType === "register" ? "Return to login" : "Create new account"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default MainPagePopup;
