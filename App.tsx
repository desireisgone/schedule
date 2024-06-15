/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CacheProvider } from './contexts/CacheContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <CacheProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
