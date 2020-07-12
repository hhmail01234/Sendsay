import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";
import FormatRequestIcon from "assets/FormatRequestIcon.js";
import Button from "assets/Button.js";
export default function Footer({ handleSubmit, setRequest }) {
  const { isFetching, request } = useSelector((state) => state.console);
  function formatRequest() {
    setRequest(JSON.stringify(JSON.parse(request), undefined, "\t"));
  }
  let btnState;
  if (isFetching) {
    btnState = "isFetching";
  } else {
    btnState = "valid";
  }
  return (
    <footer className="footer">
      <Button state={btnState} text="Отправить" handleClick={handleSubmit} />
      <button className="gitLink">@link-to-your-github</button>
      <button className="footer-formatRequestBtn" onClick={formatRequest}>
        <FormatRequestIcon />
        <span>Форматировать</span>
      </button>
    </footer>
  );
}
