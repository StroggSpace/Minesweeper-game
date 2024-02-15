import Logo from "../../assets/gnome-mines.svg?react";
export default function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <a className="header__logo" href="/">
          <Logo className="header__logo-icon" />
          <h1 className="header__logo-title">Minesweeper</h1>
        </a>
      </div>
    </header>
  );
}
