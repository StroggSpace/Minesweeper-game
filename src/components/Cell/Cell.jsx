import { useEffect, useState } from "react";
import { CELL_STYLE } from "../global/CONST";

export default function Cell(props) {
  const [state, setState] = useState(props.cellData);

  useEffect(() => {
    setState(props.cellData);
  }, [props.cellData]);

  const handleClick = () => {
    props.onCellClick(props.cellData.x, props.cellData.y);
  };

  function handleContextMenu(event) {
    event.preventDefault();
    props.onCellRightClick(props.cellData.x, props.cellData.y);
  }

  return (
    <div
      className={getClassName(props.cellData.state, props.cellData.value)}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {props.cellData.value}
    </div>
  );
}

const getClassName = (cell, value) => {
  if (cell === "closed") {
    return CELL_STYLE["hidden"];
  } else if (cell === "question") {
    return CELL_STYLE["question"];
  } else if (cell === "flagged") {
    return CELL_STYLE["flagged"];
  }
  if (value === "*") {
    return CELL_STYLE[0];
  }
  return CELL_STYLE[value];
};
