import React from 'react';
import ReactDOM from 'react-dom';
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
import history from "./history";

moment.locale('pl');
export const { axiosSecured } = setupAxios();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Pageloader/>} persistor={persistor}>
            <App history={history}/>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));