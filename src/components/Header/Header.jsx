export default function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <a className="header__logo" href="/">
          <img src="src\assets\gnome-mines.svg" alt="logo" />
          <h1 className="header__logo-title">Minesweeper</h1>
        </a>
      </div>
    </header>
  );
}
