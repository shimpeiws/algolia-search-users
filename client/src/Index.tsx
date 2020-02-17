import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import { Routes } from "./Routes";
import { HashRouter } from "react-router-dom";
import { Reset } from "styled-reset";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Reset />
      <Routes />
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
