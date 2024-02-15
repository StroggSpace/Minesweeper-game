import { Link } from "react-router-dom";
import { BTN_VARIANTS } from "../../global/CONST";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const leadersData = useSelector((state) => state.leaders);
  return (
    <div className="leaderboard__container">
      <h1>Лучшие из лучших</h1>
      <ol className="leaderboard__list">
        {leadersData.map((item, itemIndex) => (
          <li key={itemIndex} className="leaderboard__item">
            {item}
          </li>
        ))}
      </ol>
      <Link to={`/`}>{BTN_VARIANTS.back}</Link>
    </div>
  );
}
