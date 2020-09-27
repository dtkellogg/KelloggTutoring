import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App";
import "./App/App.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
// import reducer from "./App/reducers"
import middleware from "./App/middleware";

// const store = createStore(
  // reducers,
  // middleware
// )

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <Router>
        <App />
      </Router>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
