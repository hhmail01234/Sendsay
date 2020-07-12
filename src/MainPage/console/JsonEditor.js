import React from "react";

export default function JsonEditor({
  title,
  isError,
  width,
  readonly,
  handleChange,
  value,
}) {
  let errorModificator;
  isError
    ? (errorModificator = "console-jsonEditor-isError")
    : (errorModificator = "console-jsonEditor-normal");
  return (
    <div
      style={{ width: width }}
      className={`console-jsonEditor ${errorModificator}`}
    >
      <span>{title}:</span>
      <textarea
        readOnly={readonly}
        onChange={handleChange}
        value={value}
      ></textarea>
    </div>
  );
}
