import React, { useState, useEffect } from "react";
import DropdownMenu from "./components/DropdownMenu";
import ActionName from "./components/ActionName";
import OnCopyAnimation from "./components/OnCopyAnimation";
import "./ActionItem.css";
import { useDispatch } from "react-redux";
export default function ActionItem({
  data: { request, isSuccessful },
  handleSubmit,
  setRequest,
}) {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [OnCopyAnimationRef, setOnCopyAnimationRef] = useState(null);
  const [left, setLeft] = useState("0px");
  const dispatch = useDispatch();
  const delAction = (x) => {
    dispatch({ type: "delAction", payload: x });
  };
  function handleClick(e) {
    e.stopPropagation();
    switch (e.target.name) {
      case "copy":
        navigator.clipboard.writeText(request);
        let copyAnimationPos = e.target.getBoundingClientRect().left;
        OnCopyAnimationRef.style.left = copyAnimationPos + "px";
        OnCopyAnimationRef.classList.add("actionItem-onCopyAnimation-active");
        break;
      case "send":
        setRequest(request);
        handleSubmit();
        break;
      case "delete":
        delAction(request);
      default:
        break;
    }
  }
  function openMenu(e) {
    e.nativeEvent.stopImmediatePropagation();
    if (!menuIsOpened) {
      setRequest(request);
      let { left } = e.currentTarget.getBoundingClientRect();
      setMenuIsOpened(true);
      setLeft(left);
    }
  }
  function closeMenu() {
    setMenuIsOpened(false);
  }
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  return (
    <div onClick={openMenu} className="actionItem">
      <ActionName
        requestTxt={JSON.parse(request).action}
        isSuccessful={isSuccessful}
      />
      <DropdownMenu
        left={left}
        isOpened={menuIsOpened}
        handleClick={handleClick}
      />
      <OnCopyAnimation setOnCopyAnimationRef={setOnCopyAnimationRef} />
    </div>
  );
}
