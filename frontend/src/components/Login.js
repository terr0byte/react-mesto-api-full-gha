import { useState } from "react";
import "../index.css";

function Login(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit(formValue.password, formValue.email);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__header">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            name="email"
            placeholder="E-mail"
            type="email"
            onChange={handleChange}
          ></input>
          <input
            className="auth__input"
            name="password"
            placeholder="Пароль"
            type="password"
            onChange={handleChange}
          ></input>
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
