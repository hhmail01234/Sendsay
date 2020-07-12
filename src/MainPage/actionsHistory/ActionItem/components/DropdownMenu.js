import React from "react";
export default function DropdownMenu({ isOpened, handleClick, left }) {
  let style = {};
  if (isOpened) {
    style.left = left;
    style.display = "flex";
    style.top = "95px";
    style.width = "130px";
  } else {
    style.display = "none";
  }
  return (
    <div className="actionItem-menu" onClick={handleClick} style={style}>
      <a name="send">Выполнить</a>
      <a name="copy">Скопировать</a>
      <hr />
      <a name="delete">Удалить</a>
    </div>
  );
}
