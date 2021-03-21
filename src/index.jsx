import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
// import thunk from 'redux-thunk';

import rootReducer from "./store/reducers";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const App = props => {
  return (
    <BrowserRouter basename="/en">
      <Routes {...props} />
    </BrowserRouter>
  );
};

// const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
