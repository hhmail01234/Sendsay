import React, { useState, useEffect } from "react";
import Sendsay from "sendsay-api";
import LogoIcon from "assets/LogoIcon";
import LogoutIcon from "assets/LogoutIcon";
import OpenFullsreenIcon from "assets/OpenFullsreenIcon";
import ExitFullscreenIcon from "assets/ExitFullscreenIcon";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
export default function Header() {
  const dispatch = useDispatch();
  const clearSession = () => dispatch({ type: "setSession", payload: null });
  const toLoginPage = () =>
    dispatch({ type: "setIsAuthenticated", payload: false });
  const { session } = useSelector((state) => state.auth);
  const [authData, setAuthData] = useState({
    account: "account",
    sublogin: "sublogin",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  function logout() {
    const sendsay = new Sendsay();
    sendsay.setSession(session);
    sendsay.request({
      action: "logout",
    });
    localStorage.removeItem("session");
    toLoginPage();
    clearSession();
  }
  function openInFullScreen() {
    if (!isFullscreen) {
      document.body.requestFullscreen();
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      document.exitFullscreen();
    }
  }
  useEffect(() => {
    if (session) {
      const sendsay = new Sendsay();
      sendsay.setSession(session);
      sendsay.request({ action: "pong" }).then((response) => {
        let newAuthData = { account: "account", sublogin: "sublogin" };
        //если авторизация была без саблогина sublogin = account
        if (response.account === response.sublogin) {
          newAuthData.account = response.account;
        } else {
          newAuthData.account = response.account;
          newAuthData.sublogin = response.account;
        }
        setAuthData(newAuthData);
      });
    }
  }, [session]);
  useEffect(() => {
    document.onfullscreenchange = function () {
      if (document.fullscreen !== isFullscreen) {
        setIsFullscreen(document.fullscreen);
      }
    };
  });
  let Icon;
  if (isFullscreen) {
    Icon = <ExitFullscreenIcon />;
  } else {
    Icon = <OpenFullsreenIcon />;
  }
  return (
    <header className="header">
      <div>
        <LogoIcon />
        <p>API-консолька</p>
      </div>
      <div>
        <div className="header-accountName">
          <span>{`${authData.account} : ${authData.sublogin}`}</span>
        </div>
        <div onClick={logout}>
          <span>Выйти</span>
          <LogoutIcon />
        </div>
        <button className="header-fullScreenIcon" onClick={openInFullScreen}>
          {Icon}
        </button>
      </div>
    </header>
  );
}
