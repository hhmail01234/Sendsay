import React, { useEffect } from "react";
import ActionItem from "./ActionItem/ActionItem";
import ClearIcon from "assets/ClearIcon";
import { useSelector, useDispatch } from "react-redux";
import "./ActionsHistory.css";
export default function ActionsHistoryContainer({ handleSubmit, setRequest }) {
  const { actionsHistory } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const recoverHistory = (x) => {
    dispatch({
      type: "recoverHistory",
      payload: x,
    });
  };
  const clearHistory = () => {
    dispatch({ type: "clearHistory" });
  };
  function scroll(e) {
    let scrolled = e.deltaY || e.detail || e.wheelDelta;
    let container = e.currentTarget;
    container.scrollLeft += scrolled;
  }
  useEffect(() => {
    window.onbeforeunload = () =>
      localStorage.setItem("actionsHistory", JSON.stringify(actionsHistory));
  }, [actionsHistory]);
  useEffect(() => {
    let actionsHistory = localStorage.getItem("actionsHistory");
    if (actionsHistory) {
      recoverHistory(JSON.parse(actionsHistory));
    }
  }, []);
  return (
    <div onWheel={scroll} className="actionsHistory">
      {actionsHistory.map((data) => (
        <ActionItem
          setRequest={setRequest}
          handleSubmit={handleSubmit}
          key={data.request}
          data={data}
        />
      ))}
      <div className="actionsHistory-clearBtnGradient"></div>
      <div className="actionsHistory-clearBtn" onClick={clearHistory}>
        <ClearIcon />
      </div>
    </div>
  );
}
