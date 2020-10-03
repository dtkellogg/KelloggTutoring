import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App";
import "./App/App.scss";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import store from './App/store'


ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById("root")
);
