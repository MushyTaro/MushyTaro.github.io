import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import GamePage from "./components/game-page/GamePage";
import "./styles/App.css";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game/" element={<GamePage />} />
    </Routes>
  </HashRouter>
);

ReactDOM.createRoot(document.getElementById("content")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
