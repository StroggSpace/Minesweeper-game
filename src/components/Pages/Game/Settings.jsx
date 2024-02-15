import Button from "../../Button/Button";
import { useState } from "react";

export const EASY_FIELD = {
  width: 8,
  height: 8,
  mines: 10,
  time: 600,
};

export const DEFAULT_FIELD = {
  width: 16,
  height: 16,
  mines: 40,
  time: 2400,
};

export const HARD_FIELD = {
  width: window.innerWidth > 980 ? 32 : 16,
  height: window.innerWidth > 980 ? 16 : 32,
  mines: 80,
  time: 6000,
};

//Получаю актуальные настройки из localStorage
//Если нет, то использую стандартные настройки

export const getCurrentSettings = () => {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {
    settings = EASY_FIELD;
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  return settings;
};

// При нажатии на кнопку меняю настройки
export const Settings = ({ onSettingsUpdated }) => {
  const setSettings = (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
    onSettingsUpdated(settings);
  };

  // Активная кнопка соответствует текущим настройкам
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (settings, buttonName) => {
    setSettings(settings);
    setActiveButton(buttonName);
  };

  return (
    <div className="settings__wrapper">
      <h2 className="settings__title">
        Выбор <br /> сложности
      </h2>
      <Button
        className={activeButton === "easy" ? "active" : ""}
        onClick={() => handleButtonClick(EASY_FIELD, "easy")}
      >
        Легкий (8x8)
      </Button>
      <Button
        className={activeButton === "default" ? "active" : ""}
        onClick={() => handleButtonClick(DEFAULT_FIELD, "default")}
      >
        Средний (16x16)
      </Button>
      <Button
        className={activeButton === "hard" ? "active" : ""}
        onClick={() => handleButtonClick(HARD_FIELD, "hard")}
      >
        Сложный (32x16)
      </Button>
    </div>
  );
};
