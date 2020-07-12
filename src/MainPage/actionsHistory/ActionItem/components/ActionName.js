import React from "react";
import VerticalDotes from "assets/VerticalDotes";
export default function ActionName({ isSuccessful, requestTxt }) {
  let successModificator;
  isSuccessful
    ? (successModificator = "actionItem-successIcon-success")
    : (successModificator = "actionItem-successIcon-fail");
  return (
    <div className="actionItem-actionName">
      <div className={`actionItem-successIcon ${successModificator}`}></div>
      <div>
        <span className="actionItem-requestTxt">{requestTxt}</span>
      </div>
      <VerticalDotes />
    </div>
  );
}
