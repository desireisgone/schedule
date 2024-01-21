import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenUniversities, ScreenFaculties, ScreenGroups } from "./ChangeGroupScreens";
import { useFocusEffect } from "@react-navigation/native";
import { themes } from "../styles/style";
import { useTheme } from './ThemeContext';
import { useCache } from "./CacheContext";

const Stack = createStackNavigator()

export default function StackNav() {
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

const Header = ({ university, currentTheme }) => {
  return (
    <View style={[styles.header, { backgroundColor: currentTheme.maincolor }]}>
      <Text style={styles.headerText}>{university}</Text>
    </View>
  );
}

function Profile({ navigation, route }) {

  const { currentTheme, changeTheme } = useTheme()
  const { clearCache, setGroupId } = useCache()

  const [university, setUniversity] = useState(null)
  const [group, setGroup] = useState(null)

  const loadData = async () => {
    try {
      const data = await AsyncStorage.multiGet(['user_university', 'user_group'])
      if (data[0][1] !== null && data[1][1] !== null) {
        setUniversity(data[0][1].toString())
        setGroup(data[1][1].toString())
      }
      else {
        setUniversity('Университет не выбран')
        setGroup('не выбрана')
      }
    } catch (error) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  const loadAfterChange = async () => {
    try {
      setUniversity(route.params.university_title)
      setGroup(route.params.group.title)
      const newGroupId = (route.params.group.id_group).toString()
      await AsyncStorage.multiSet([['user_university', university], ['user_group', group], ['user_id_group', newGroupId]])
      setGroupId(newGroupId)
      route.params = null
    } catch (error) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useFocusEffect(() => {
    if (route.params) {
      loadAfterChange()
    }
    else {
      loadData()
    }
  })

  return (
    <View style={styles.container}>
      <Header university={university} currentTheme={currentTheme} />
      {/* Дополнительный текст и кнопка */}
      <View style={styles.content}>
        <Text style={[styles.additionalText, { color: currentTheme.maincolor }]}>
          Группа: {group}
        </Text>
        <TouchableOpacity
          style={[
            styles.button1,
            { backgroundColor: currentTheme.buttons_and_lessons },
          ]}
          onPress={() => {
            navigation.navigate('Universities');
          }}
        >
          <Text style={styles.buttonText1}>Сменить группу</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button2,
            { backgroundColor: currentTheme.buttons_and_lessons },
          ]}
          onPress={() => {
            //при нажатии на кнопку поменять группу было бы славно
          }}
        >
          <Text style={styles.buttonText2}>Оценить приложение</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button3,
            { backgroundColor: currentTheme.buttons_and_lessons },
          ]}
          onPress={() => {
            //при нажатии на кнопку поменять группу было бы славно
          }}
        >
          <Text style={styles.buttonText3}>Поделиться приложением</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttontheme,
            { backgroundColor: currentTheme.buttons_and_lessons },
          ]}
          onPress={() => {
            changeTheme();
          }}
        >
          <Text style={styles.buttonTexttheme}>Сменить тему</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonClearCache,
            { backgroundColor: currentTheme.orange },
          ]}
          onPress={() => {
            clearCache();
          }}
        >
          <Text style={styles.buttonClearCacheText}>Очистить кэш</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.green.maincolor,
    // backgroundColor: "#3D64EC",
    padding: 23,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Bold',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  additionalText: {
    color: themes.green.maincolor,
    // color: "#3D64EC",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Medium',
  },
  button1: {
    backgroundColor: themes.green.buttons_and_lessons,
    // backgroundColor: "#7393FF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
    elevation: 5, //тень
  },
  buttonText1: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  button2: {
    backgroundColor: themes.green.buttons_and_lessons,
    // backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 170,
    },
  buttonText2: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  button3: {
    backgroundColor: themes.green.buttons_and_lessons,
    // backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    },
  buttonText3: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  buttontheme: {
    backgroundColor: themes.green.buttons_and_lessons,
    // backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
      },
  buttonTexttheme: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  buttonClearCache: {
    // backgroundColor: "#ffcd5b",
    backgroundColor: themes.green.orange,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: -65,
    },
  buttonClearCacheText: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Medium',
  }
});