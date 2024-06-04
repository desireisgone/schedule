import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../pages/Main.js';
import Search from '../pages/Search.js';
import ProfileNavigator from './ProfileNavigator.js'; 
import Notes from '../pages/Notes.js';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../styles/style';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const { currentTheme, bottomTabBackground } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={[{ backgroundColor: bottomTabBackground, }, StyleSheet.absoluteFill ]} />
        ),
        tabBarStyle: { height: "8%", },
      }}
    >
      <Tab.Screen 
        name='calendar'
        component={Main}
        options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: 40, height: 40 }}
            source={currentTheme === themes.green
              ? (info.focused ? require('../assets/calendarChosen_2.png') : require('../assets/calendar_2.png'))
              : (info.focused ? require('../assets/calendarChosen.png') : require('../assets/calendar.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='edit'
          component={Notes}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: 40, height: 40 }}
            source={currentTheme === themes.green
              ? (info.focused ? require('../assets/editChosen_2.png') : require('../assets/edit_2.png'))
              : (info.focused ? require('../assets/editChosen.png') : require('../assets/edit.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='search'
          component={Search}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: 40, height: 40 }}
            source={currentTheme === themes.green
              ? (info.focused ? require('../assets/searchChosen_2.png') : require('../assets/search_2.png'))
              : (info.focused ? require('../assets/searchChosen.png') : require('../assets/search.png'))
            }
          />
          } }}/>
        <Tab.Screen
          name='profile'
          component={ProfileNavigator}
          options={{ tabBarIcon: (info) => {
          return <Image
            style={{ width: 40, height: 40 }}
            source={currentTheme === themes.green
              ? (info.focused ? require('../assets/profileChosen_2.png') : require('../assets/profile_2.png'))
              : (info.focused ? require('../assets/profileChosen.png') : require('../assets/profile.png'))
            }
          />
          } }}/>
    </Tab.Navigator>
  );
}