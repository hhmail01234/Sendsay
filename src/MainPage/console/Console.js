import React, { useState, useEffect } from "react";
import DraggableSplitter from "./DraggableSplitter";
import JsonEditor from "./JsonEditor";
import "./Console.css";
import { useSelector } from "react-redux";
export default function Console({ setErrors, setRequest }) {
  const { errors, request, response } = useSelector((state) => state.console);
  function handleChange(e) {
    setRequest(e.target.value);
    if (errors.inRequest || errors.inResponse) {
      setErrors({ inRequest: false, inResponse: false });
    }
  }
  const [width, setWidth] = useState({
    responseField: "100%",
    requestField: "100%",
  });
  function onMouseMove(event) {
    moveAt(event.pageX);
  }
  function moveAt(pageX) {
    let requestFieldWidth = pageX + "px";
    let responseFieldWidth = document.body.clientWidth - pageX + "px";
    setWidth({
      responseField: responseFieldWidth,
      requestField: requestFieldWidth,
    });
  }
  function drag() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      function (e) {
        localStorage.setItem("width", Number(e.pageX));
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  }
  useEffect(() => {
    let width = localStorage.getItem("width");
    if (width) {
      moveAt(width);
    }
  }, []);
  return (
    <div className="console">
      <JsonEditor
        value={request}
        title={"Запрос"}
        readonly={false}
        width={width.requestField}
        isError={errors.inRequest}
        handleChange={handleChange}
      />
      <DraggableSplitter drag={drag} />
      <JsonEditor
        title={"Ответ"}
        value={response}
        readonly={true}
        width={width.responseField}
        isError={errors.inResponse}
      />
    </div>
  );
}
