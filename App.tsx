/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/Main';
import Search from './components/Search';
import Profile from './components/Profile';
import { globalStyles } from './styles/style';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarBackground: () => (
        <View style={[ globalStyles.main, StyleSheet.absoluteFill ]} />
      )}}>
        <Tab.Screen name='calendar' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/calendarChosen.png") : require("./assets/calendar.png")}/>
        } }}/>
        <Tab.Screen name='edit' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/editChosen.png") : require("./assets/edit.png")}/>
        } }}/>
        <Tab.Screen name='search' component={Search} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/searchChosen.png") : require("./assets/search.png")}/>
        } }}/>
        <Tab.Screen name='profile' component={Profile} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/profileChosen.png") : require("./assets/profile.png")}/>
        } }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
