import React from 'react';
import { ConnectedRouter } from "connected-react-router";
import './App.scss';
import {routes} from "./routes";
import {Header} from "./components/header/Header.component";
import {Pageloader} from "./components/pageloader/Pageloader.component";

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Header/>
      <Pageloader/>
        {routes}
    </ConnectedRouter>
  );
}

export default App;
