/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/Main';
import Search from './components/Search';
import Profile from './components/Profile';
import Notes from './components/Notes';
import { useTheme, ThemeProvider } from './components/ThemeContext';
import { useCache, CacheProvider } from './components/CacheContext';
import { themes } from './styles/style';

const Tab = createBottomTabNavigator();

function AppContent() {
  const { currentTheme, bottomTabBackground } = useTheme()
  const { changeTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={[{ backgroundColor: bottomTabBackground }, StyleSheet.absoluteFill]} />
        ),
      }}
    >
      <Tab.Screen 
        name='calendar'
        component={Main}
        options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: info.size, height: info.size }}
            source={currentTheme === themes.green
              ? (info.focused ? require('./assets/calendarChosen_2.png') : require('./assets/calendar_2.png'))
              : (info.focused ? require('./assets/calendarChosen.png') : require('./assets/calendar.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='edit'
          component={Notes}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: info.size, height: info.size }}
            source={currentTheme === themes.green
              ? (info.focused ? require('./assets/editChosen_2.png') : require('./assets/edit_2.png'))
              : (info.focused ? require('./assets/editChosen.png') : require('./assets/edit.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='search'
          component={Search}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: info.size, height: info.size }}
            source={currentTheme === themes.green
              ? (info.focused ? require('./assets/searchChosen_2.png') : require('./assets/search_2.png'))
              : (info.focused ? require('./assets/searchChosen.png') : require('./assets/search.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='profile'
          component={Profile}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: info.size, height: info.size }}
            source={currentTheme === themes.green
              ? (info.focused ? require('./assets/profileChosen_2.png') : require('./assets/profile_2.png'))
              : (info.focused ? require('./assets/profileChosen.png') : require('./assets/profile.png'))
            }
          />
          } }}/>
    </Tab.Navigator>
  );
}

export function App() {
  return (
    <CacheProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
