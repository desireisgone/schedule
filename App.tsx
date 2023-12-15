/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from './components/Main';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { globalStyles } from './styles/style';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarBackground: () => (
        <View style={[ globalStyles.main, StyleSheet.absoluteFill ]} />
      )}}>
        <Tab.Screen name='calendar' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: 30, height: 30, margin: 10 }} source={ (info.focused) ? require("./assets/calendarChosen.png") : require("./assets/calendar.png")}/>
        } }}/>
        <Tab.Screen name='edit' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: 30, height: 30, margin: 10 }} source={ (info.focused) ? require("./assets/editChosen.png") : require("./assets/edit.png")}/>
        } }}/>
        <Tab.Screen name='profile' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: 30, height: 30, margin: 10 }} source={ (info.focused) ? require("./assets/profileChosen.png") : require("./assets/profile.png")}/>
        } }}/>
        <Tab.Screen name='search' component={Main} options={{ tabBarIcon: (info) => {
          return <Image style={{ width: 30, height: 30, margin: 10 }} source={ (info.focused) ? require("./assets/searchChosen.png") : require("./assets/search.png")}/>
        } }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
