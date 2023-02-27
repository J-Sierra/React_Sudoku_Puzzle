import React from "react";
import ReactDOM from "react-dom/client";
import "./comps/styles/index.scss";
import { Provider } from "react-redux";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import store from "./comps/redux/store";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
