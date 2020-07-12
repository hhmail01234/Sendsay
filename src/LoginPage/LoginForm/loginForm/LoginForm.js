import React from "react";
import "./LoginForm.css";
import Button from "assets/Button.js";
export default function LoginForm(props) {
  let loginRowModificator, subloginRowModificator, passwordRowModificator;
  let {
    login,
    sublogin,
    password,
    validationErrors,
    handleChange,
    handleSubmit,
    formState,
  } = props;
  validationErrors.login
    ? (loginRowModificator = "loginForm-row-error")
    : (loginRowModificator = "loginForm-row-normal");
  validationErrors.sublogin
    ? (subloginRowModificator = "loginForm-row-error")
    : (subloginRowModificator = "loginForm-row-normal");
  validationErrors.password
    ? (passwordRowModificator = "loginForm-row-error")
    : (passwordRowModificator = "loginForm-row-normal");
  return (
    <div>
      <form onSubmit={handleSubmit} className="loginForm">
        <div className={`loginForm-row ${loginRowModificator}`}>
          <label htmlFor="login">Логин</label>
          <input
            noValidate
            value={login}
            type="text"
            name="login"
            onChange={handleChange}
          />
        </div>
        <div
          className={`loginForm-row loginForm-row-optional  ${subloginRowModificator}`}
        >
          <label htmlFor="sublogin">Сублогин</label>
          <input
            noValidate
            value={sublogin}
            type="text"
            name="sublogin"
            onChange={handleChange}
          />
          <span>Опционально</span>
        </div>
        <div className={`loginForm-row ${passwordRowModificator}`}>
          <label htmlFor="password">Пароль</label>
          <input
            noValidate
            value={password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <Button text="Войти" state={formState} />
      </form>
    </div>
  );
}
