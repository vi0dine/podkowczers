import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import {store} from "./redux/store";
import {persistor} from "./redux/store";
import './index.css';
import App from './App';
import 'moment/locale/pl'
import moment from "moment";
import {setupAxios} from "./axios/setup";
import {Pageloader} from "./components/pageloader/Pageloader.component";

moment.locale('pl');
export const { axiosPlain, axiosSecured } = setupAxios();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Pageloader/>} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));