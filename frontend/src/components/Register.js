import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Register(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit(formValue.password, formValue.email);
  }
  return (
    <>
      <div className="auth">
        <h2 className="auth__header">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            name="email"
            placeholder="E-mail"
            type="email"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            className="auth__input"
            name="password"
            placeholder="Пароль"
            type="password"
            value={formValue.password}
            onChange={handleChange}
          />
          <button className="auth__button" type="submit">
            Зарегестрироваться
          </button>
          <Link to={"/sign-in"} className="auth__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
