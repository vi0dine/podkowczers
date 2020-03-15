import React, {useEffect, useState} from 'react';
import * as Font from 'expo-font';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import {setupAxios} from "./config/axios";
import {NavigationContainer} from "@react-navigation/native";
import RootStack from "./navigator";
import moment from "moment";
import {Root} from "native-base";
import localization from 'moment/locale/pl';


export default function App() {
  const [ready, setReady] = useState(false);

  const loadFonts = async () => {
    moment.updateLocale('pl', localization);
    await Font.loadAsync({
      'Alata Regular': require('./assets/Alata-Regular.ttf'),
    })
  };

  useEffect(() => {
    setupAxios();
    loadFonts().then(() => {
      setReady(true)
    })
  }, []);

  return ready && (
      <Root>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
              <RootStack/>
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </Root>
  );
}