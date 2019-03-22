import React from "react";
import ReactDOM from "react-dom";
import routes from "./Routes/routes";
import "./main.css";

/**
 * Redux
 */
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducer/root-reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("app")
);
