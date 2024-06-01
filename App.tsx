/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator.js';
import { ThemeProvider } from './contexts/ThemeContext';
import { CacheProvider } from './contexts/CacheContext';

export function App() {
  return (
    <CacheProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
