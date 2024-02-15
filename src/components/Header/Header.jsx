import { Link } from "react-router-dom";
import Logo from "../../assets/gnome-mines.svg?react";
export default function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to={`/`} className="header__logo">
          <Logo className="header__logo-icon" />
          <h1 className="header__logo-title">Minesweeper</h1>
        </Link>
      </div>
    </header>
  );
}
