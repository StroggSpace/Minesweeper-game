import { Link } from "react-router-dom";
import Button from "../../Button/Button";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Упс!</h1>
      <p>Произошла непредвиденная ошибка</p>
      <Button>
        <Link to={`/`}>Вернуться на главную</Link>
      </Button>
    </div>
  );
}
