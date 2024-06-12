import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../pages/Main';
import Search from '../pages/Search';
import ProfileNavigator from './ProfileNavigator'; 
import Notes from '../pages/Notes';
import { RootReducer } from '../store/store.js';
import { Icon } from '../components/Icon.js';
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const currentTheme = useSelector((state: RootReducer) => state.themeReducer)
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View style={[{ backgroundColor: currentTheme?.colors.maincolor, }, StyleSheet.absoluteFill ]} />
          ),
          tabBarStyle: { height: "8%", },
        }}
      >
        <Tab.Screen 
          name='calendar'
          component={Main}
          options={{ tabBarIcon: (info) => <Icon name='calendar' size={30} style={{color: (info.focused) ? currentTheme?.colors.alter : currentTheme?.colors.buttons_and_lessons}}/> }}
        />
        <Tab.Screen
          name='edit'
          component={Notes}
          options={{ tabBarIcon: (info) => <Icon name='edit' size={30} style={{color: (info.focused) ? currentTheme?.colors.alter : currentTheme?.colors.buttons_and_lessons}}/> }}
        />
        <Tab.Screen
          name='search'
          component={Search}
          options={{ tabBarIcon: (info) => <Icon name='search' size={30} style={{color: (info.focused) ? currentTheme?.colors.alter : currentTheme?.colors.buttons_and_lessons}}/> }}
        />
        <Tab.Screen
          name='profile'
          component={ProfileNavigator}
          options={{ tabBarIcon: (info) => <Icon name='profile' size={30} style={{color: (info.focused) ? currentTheme?.colors.alter : currentTheme?.colors.buttons_and_lessons}}/> }}
        />
      </Tab.Navigator>
  );
}