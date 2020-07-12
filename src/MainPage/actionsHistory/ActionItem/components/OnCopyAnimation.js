import React, { useEffect } from "react";

export default function OnCopyAnimation({ setOnCopyAnimationRef }) {
  const ref = React.useRef();
  function hide() {
    ref.current.classList.remove("actionItem-onCopyAnimation-active");
  }
  useEffect(() => {
    setOnCopyAnimationRef(ref.current);
    ref.current.addEventListener("animationend", hide);
  }, []);
  return (
    <div ref={ref} className={"actionItem-onCopyAnimation"}>
      Скопировано
    </div>
  );
}
