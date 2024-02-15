import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Game from "./components/Pages/Game/Game";
import { BTN_VARIANTS } from "./components/global/CONST";
import Leaderboard from "./components/Pages/Leaderboard/Leaderboard";
import ErrorPage from "./components/Pages/Error/error-page";

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <nav className="nav">
        <Link to={`/leaderboard`}>{BTN_VARIANTS.leaderboard}</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
