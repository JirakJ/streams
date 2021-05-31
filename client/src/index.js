import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";


const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector("#root")
);
