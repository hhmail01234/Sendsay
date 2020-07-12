import React, { useEffect, useState } from "react";
import MainPage from "./MainPage/MainPage";
import LoginPage from "./LoginPage/LoginPage";
import Sendsay from "sendsay-api";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import "./buttons.css";
export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  //action creator правильнее было бы вынести в отдельную папку
  const setSession = function (session) {
    dispatch({ type: "setSession", payload: session });
  };
  const setIsAuth = function (isAuth) {
    dispatch({ type: "setIsAuthenticated", payload: isAuth });
  };
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const sendsay = new Sendsay();
      sendsay.setSession(session);
      sendsay
        .request({
          action: "pong",
        })
        .then(() => {
          setIsAuth(true);
          setSession(session);
        })
        .catch((e) => {
          setIsAuth(false);
          localStorage.removeItem("session");
        });
    }
  }, []);
  if (isAuthenticated) {
    return <MainPage />;
  } else {
    return <LoginPage />;
  }
}
