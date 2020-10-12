import React from "react";
import ReactDOM from "react-dom";
import App from "../app";
import { createStore } from 'redux';
import allReducers from '../reducers/allReducers';
import { Provider } from 'react-redux';


const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
      </Provider>,
    
    div);
  ReactDOM.unmountComponentAtNode(div);
});