import React from "react"
import { Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ScreenUniversities from "../components/ChangeUniversity"
import ScreenFaculties from "../components/ChangeFaculty"
import ScreenGroups from "../components/ChangeGroup"
import Profile from "../pages/Profile"
import { useSelector } from "react-redux"
import { RootReducer } from "../store/store"
import { StackParamList } from "../components/types"

const Stack = createStackNavigator<StackParamList>()

export default function ProfileNavigator() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen
        name="Universities"
        component={ScreenUniversities}
        options={{
          title: "Выберите учебное заведение",
          headerStyle: { backgroundColor: colors.maincolor, height: 100 },
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
          headerStyle: { backgroundColor: colors.maincolor, height: 70 },
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
          headerStyle: { backgroundColor: colors.maincolor, height: 70 },
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
