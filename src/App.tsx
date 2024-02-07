import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./components/game-page/GamePage";
import MainPage from "./components/main-page/MainPage";
import "./styles/App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game/:difficulty/:discColor" element={<GamePage />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("content")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
