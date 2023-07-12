import logoPath from "../images/Logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import "../index.css";

function Header(props) {
  function handleClick() {
    props.onClick();
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого" />
      <div className="header__container">
        {props.loggedIn ? (
          <p className="header__email">{props.email}</p>
        ) : (
          <></>
        )}
        <Routes>
          <Route
            path="/"
            element={<Link className="header__link" to="/sign-in"></Link>}
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/mesto"
            element={
              <Link
                className="header__link"
                to="/sign-in"
                onClick={handleClick}
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
