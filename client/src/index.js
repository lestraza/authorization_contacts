import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './style.css'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducer from './store/reducer'

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById("root")
);
