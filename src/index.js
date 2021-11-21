import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';

let initialState = [];

function reducer(state = initialState, action) {
  if (action.type === 'wikiadd') {
    let copy = [];
    copy.push(...action.payload);
    return copy;
  } else if (action.type === 'wikiupdate'){
    let copy = [...state];
    copy[0].quan++;
    return copy
  } else if (action.type === 'wikidelete'){
    let copy = [...state];
    copy[0].quan--;
    return copy
  } else {
    return state
  }
}

let store = createStore(reducer
  ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const Index = () => {
  return <div>
    <App />
  </div>;
};

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <Index />
    </Provider>
  </BrowserRouter>
, document.getElementById("index"));