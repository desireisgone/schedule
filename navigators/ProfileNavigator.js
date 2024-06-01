import React from "react"
import { Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { useTheme } from '../contexts/ThemeContext'
import ScreenUniversities from "../components/ChangeUniversity.js"
import ScreenFaculties from "../components/ChangeFaculty.js"
import ScreenGroups from "../components/ChangeGroup.js"
import Profile from "../pages/Profile.js"

const Stack = createStackNavigator()

export default function ProfileNavigator() {
  const { currentTheme, changeTheme } = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen
        name="Universities"
        component={ScreenUniversities}
        options={{
          title: "Выберите учебное заведение",
          headerStyle: { backgroundColor: currentTheme.maincolor, height: 100 },
          headerTintColor: 'white',
          headerTitle: () => (
            <Text style={{
              fontFamily: 'JetBrainsMono-Bold',
              fontSize: 25,
              color: 'white', 
              flexWrap: 'wrap', 
              textAlign: 'center',
            }}>
              Выберите учебное заведение
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Faculties"
        component={ScreenFaculties}
        options={{
          title: "Выберите факультет",
          headerStyle: { backgroundColor: currentTheme.maincolor, height: 70 },
          headerTintColor: 'white',
          headerTitle: () => (
            <Text style={{
              fontFamily: 'JetBrainsMono-Bold',
              fontSize: 25,
              color: 'white',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}>
              Выберите факультет
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Groups"
        component={ScreenGroups}
        options={{
          title: "Выберите группу",
          headerStyle: { backgroundColor: currentTheme.maincolor, height: 70 },
          headerTintColor: 'white',
          headerTitle: () => (
            <Text style={{
              fontFamily: 'JetBrainsMono-Bold',
              fontSize: 25,
              color: 'white',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}>
              Выберите группу
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  )
}
