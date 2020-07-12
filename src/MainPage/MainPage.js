import React from "react";
import Header from "./header/Header";
import ActionsHistory from "./actionsHistory/ActionsHistory";
import Console from "./console/Console";
import Footer from "./footer/Footer";
import Sendsay from "sendsay-api";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
export default function MainPage() {
  const dispatch = useDispatch();
  const { isFetching, request } = useSelector((state) => state.console);
  const { session } = useSelector((state) => state.auth);
  const setRequest = (x) => {
    dispatch({ type: "setRequest", payload: x });
  };
  const setResponse = (x) => {
    dispatch({ type: "setResponse", payload: x });
  };
  const setErrors = (x) => {
    dispatch({ type: "setErrors", payload: x });
  };
  const setIsFetching = (x) => {
    dispatch({ type: "setIsFetching", payload: x });
  };
  const saveAction = (x) => {
    dispatch({ type: "saveAction", payload: x });
  };
  function handleSubmit() {
    if (isFetching) return;
    if (validateRequest()) {
      send();
      return;
    } else {
      setErrors({ inRequest: true, inResponse: false });
    }
  }
  function validateRequest() {
    try {
      JSON.parse(request);
      if (!isNaN(parseInt(request))) {
        throw new Error("Только число");
      }
    } catch (e) {
      return false;
    }
    return true;
  }
  function send() {
    setIsFetching(true);
    const sendsay = new Sendsay();
    sendsay.setSession(session);
    sendsay
      .request(JSON.parse(request))
      .then((response) => {
        saveAction({ request: request, isSuccessful: true });
        setResponse(JSON.stringify(response, undefined, "\t"));
      })
      .catch((error) => {
        saveAction({ request: request, isSuccessful: false });
        setResponse(JSON.stringify(error, undefined, "\t"));
        setErrors({ inRequest: false, inResponse: true });
      })
      .finally(() => setIsFetching(false));
  }
  return (
    <div className="mainPage">
      <Header />
      <ActionsHistory setRequest={setRequest} handleSubmit={handleSubmit} />
      <Console setRequest={setRequest} setErrors={setErrors} />
      <Footer setRequest={setRequest} handleSubmit={handleSubmit} />
    </div>
  );
}
