import React from "react";
import SmileIcon from "assets/SmileIcon";
import "./AuthError.css";
export default function AuthError({ isVisible, errorTxt }) {
  let visibilityModificator;
  if (isVisible) {
    visibilityModificator = "authError--isVisible";
  } else {
    visibilityModificator = "authError--hidden";
  }
  return (
    <div className={`authError ${visibilityModificator}`}>
      <div className="authError-smile">
        <SmileIcon />
      </div>
      <div className="authError-header">
        <span>Вход не вышел</span>
        <span className="authError-errorTxt">{errorTxt} </span>
      </div>
    </div>
  );
}
