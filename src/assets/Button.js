import React from "react";
import Spinner from "assets/Spinner.js";
export default function LoginBtn({ state, text, handleClick }) {
  switch (state) {
    case "valid":
      return (
        <button
          onClick={handleClick}
          className="btn btn--primary"
          type="submit"
        >
          {text}
        </button>
      );
    case "isFetching":
      return (
        <div
          onClick={(e) => e.preventDefault()}
          className="btn btn--primary spinner"
        >
          <Spinner />
        </div>
      );
    default:
      return (
        <button
          onClick={(e) => e.preventDefault()}
          className="btn btn--disabled"
        >
          {text}
        </button>
      );
  }
}
