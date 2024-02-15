import Button from "../../Button/Button";

export const EASY_FIELD = {
  width: 8,
  height: 8,
  mines: 10,
  time: 600,
  name: "easy",
};

export const DEFAULT_FIELD = {
  width: 16,
  height: 16,
  mines: 40,
  time: 2400,
  name: "default",
};

export const HARD_FIELD = {
  width: window.innerWidth > 980 ? 32 : 16,
  height: window.innerWidth > 980 ? 16 : 32,
  mines: 80,
  time: 6000,
  name: "hard",
};

//Получаю актуальные настройки из localStorage
//Если нет, то использую стандартные настройки

export const getCurrentSettings = () => {
  try {
    let settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings) {
      settings = EASY_FIELD;
      localStorage.setItem("settings", JSON.stringify(settings));
    }
    return settings;
  } catch (error) {
    console.error("Ошибка при разборе JSON:", error);
    // обработка ошибки - возврат значения по умолчанию
    return EASY_FIELD;
  }
};

// При нажатии на кнопку меняю настройки
export const Settings = ({ onSettingsUpdated }) => {
  const setSettings = (settings) => {
    try {
      localStorage.setItem("settings", JSON.stringify(settings));
      onSettingsUpdated(settings);
    } catch (error) {
      console.error("Ошибка при сохранении настроек в localStorage:", error);
      // обработка ошибки
    }
  };

  // Активная кнопка соответствует текущим настройкам

  return (
    <div className="settings__wrapper">
      <h2 className="settings__title">
        Выбор <br /> сложности
      </h2>
      <Button
        className={getCurrentSettings().name === "easy" ? "active-easy" : ""}
        onClick={() => setSettings(EASY_FIELD)}
      >
        Легкий (8x8)
      </Button>
      <Button
        className={
          getCurrentSettings().name === "default" ? "active-default" : ""
        }
        onClick={() => setSettings(DEFAULT_FIELD)}
      >
        Средний (16x16)
      </Button>
      <Button
        className={getCurrentSettings().name === "hard" ? "active-hard" : ""}
        onClick={() => setSettings(HARD_FIELD)}
      >
        Сложный (32x16)
      </Button>
    </div>
  );
};
