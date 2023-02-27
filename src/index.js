import React from "react";
import ReactDOM from "react-dom/client";
import "./comps/styles/index.scss";
import { Provider } from "react-redux";
import App from "./app";
import store from "./comps/redux/store";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
