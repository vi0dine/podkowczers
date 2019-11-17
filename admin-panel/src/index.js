import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import history from "./history";
import {store, persistor} from "./redux/store";
import {setupAxios} from "./axios/setup";

export const { axiosSecured } = setupAxios();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <App history={history}/>
        </PersistGate>
    </Provider>
, document.getElementById('root'));
