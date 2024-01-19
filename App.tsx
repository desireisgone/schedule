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
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/calendarChosen_2.png") : require("./assets/calendar_2.png")}/>
        } }}/>
        <Tab.Screen name='edit' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/editChosen_2.png") : require("./assets/edit_2.png")}/>
        } }}/>
        <Tab.Screen name='search' component={Search} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/searchChosen_2.png") : require("./assets/search_2.png")}/>
        } }}/>
        <Tab.Screen name='profile' component={Profile} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: info.size, height: info.size }} source={ (info.focused) ? require("./assets/profileChosen_2.png") : require("./assets/profile_2.png")}/>
        } }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
