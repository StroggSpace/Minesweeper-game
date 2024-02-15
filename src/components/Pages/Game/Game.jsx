import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../Button/Button";
import { BTN_VARIANTS } from "../../global/CONST";
import { getCurrentSettings, Settings } from "./Settings";
import { createMatrix, openAdjacentCells, setMines } from "../../global/Matrix";
import Cell from "../../Cell/Cell";
import { addLeader } from "../../global/store/store";

export default function Game() {
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [settings, setSettings] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  // Проверка первого клика
  const [isFirstClick, setIsFirstClick] = useState(true);

  useEffect(() => {
    if (start && !isGameOver && !isVictory) {
      const interval = setInterval(() => {
        if (seconds < settingsTime) {
          setSeconds((seconds) => seconds + 1);
        } else {
          setIsGameOver(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start, isGameOver, isVictory]);

  //Получение настроек
  useEffect(() => {
    setSettings(getCurrentSettings());
  }, []);

  //Установка таймера
  const [seconds, setSeconds] = useState(0);
  const settingsTime = getCurrentSettings().time;

  const startGame = () => {
    setSeconds(0);
    setIsGameOver(false);
    setIsVictory(false);
    setIsFirstClick(true);
    setStart(true);
    setMatrix(createMatrix(settings.width, settings.height));
  };

  //Кнопка выйти
  const exitGame = () => {
    setStart(false);
    setIsVictory(false);
    setIsGameOver(false);
  };

  // Проверка по первому клику
  const onCellClick = (x, y) => {
    if (isGameOver || isVictory) {
      return;
    }
    let newMatrix = [...matrix];
    if (isFirstClick) {
      setMines(
        newMatrix,
        settings.width,
        settings.height,
        settings.mines,
        x,
        y
      );
      setIsFirstClick(false);
    }

    if (newMatrix[y][x].state === "closed") {
      newMatrix[y][x].state = "opened";
      if (newMatrix[y][x].value === 0) {
        newMatrix = openAdjacentCells(newMatrix, y, x);
      }
      setMatrix(newMatrix);
    }
    // Конец игры и показ всех бомб
    if (newMatrix[y][x].value === "*" && newMatrix[y][x].state === "opened") {
      newMatrix.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell.value === "*") {
            cell.state = "opened";
          }
        });
      });
      setMatrix(newMatrix);
      setIsGameOver(true);
      setSeconds(0);
    }

    checkVictoryCondition(newMatrix);
  };

  // Изменение state по правому клику

  const onCellRightClick = (x, y) => {
    if (isGameOver) {
      return;
    }
    let newMatrix = [...matrix];

    if (newMatrix[y][x].state === "closed") {
      newMatrix[y][x].state = "question";
    } else if (matrix[y][x].state === "question") {
      if (flagsLeft > 0) {
        newMatrix[y][x].state = "flagged";
      } else {
        newMatrix[y][x].state = "closed";
      }
    } else if (matrix[y][x].state === "flagged") {
      newMatrix[y][x].state = "closed";
    }
    setMatrix(newMatrix);
  };

  const onSettingsUpdated = (newSettings) => {
    setSettings(newSettings);
  };

  // Счетчик флагов

  let flagsLeft =
    settings.mines -
    matrix.flat().filter((cell) => cell.state === "flagged").length;

  // Победа
  const checkVictoryCondition = (newMatrix) => {
    let openedCells = newMatrix
      .flat()
      .filter((cell) => cell.state === "opened" && cell.value !== "*");
    if (
      openedCells.length ===
      settings.width * settings.height - settings.mines
    ) {
      setIsVictory(true);
      dispatch(addLeader(seconds));
    }
  };

  return (
    <main className="game">
      {(!start && (
        <>
          <Settings onSettingsUpdated={onSettingsUpdated} />
          <Button onClick={startGame}>{BTN_VARIANTS.start}</Button>
        </>
      )) || (
        <div className="game__wrapper">
          <div className="game__stat">
            <p className="game__stat-score">Флаги: {flagsLeft}</p>
            <p className="game__stat-time">Время: {seconds}</p>
          </div>
          <div
            className="game__board"
            onContextMenu={(e) => e.preventDefault()}
          >
            {isGameOver && (
              <div className="game__over">
                <h1 className="game__over-title">ПОТРАЧЕНО</h1>
              </div>
            )}

            {isVictory && (
              <div className="game__victory">
                <h1 className="game__victory-title">Миссия выполнена!</h1>
                <p className="game__victory-text">Уважение +</p>
              </div>
            )}

            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="board__row">
                {row.map((cell, cellIndex) => (
                  <Cell
                    onCellClick={onCellClick}
                    onCellRightClick={onCellRightClick}
                    key={cellIndex}
                    cellData={cell}
                  />
                ))}
              </div>
            ))}
          </div>
          <Button onClick={exitGame}>{BTN_VARIANTS.back}</Button>
          <Button onClick={startGame}>{BTN_VARIANTS.reset}</Button>
        </div>
      )}
    </main>
  );
}
