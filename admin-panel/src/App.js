import React from 'react';
import './App.scss';
import {ConnectedRouter} from "connected-react-router";
import {routes} from "./routes";
import {Header} from "./components/header/Header.component";

function App({ history }) {
  return (
      <ConnectedRouter history={history}>
          <Header/>
          {routes}
      </ConnectedRouter>
  );
}

export default App;
