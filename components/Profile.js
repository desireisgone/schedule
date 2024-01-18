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
import { globalStyles } from "../styles/style";

const Stack = createStackNavigator()

export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Universities" component={ScreenUniversities} options={{ headerStyle: { backgroundColor: globalStyles.main.backgroundColor } }} />
      <Stack.Screen name="Faculties" component={ScreenFaculties} options={{ headerStyle: { backgroundColor: globalStyles.main.backgroundColor } }} />
      <Stack.Screen name="Groups" component={ScreenGroups} options={{ headerStyle: { backgroundColor: globalStyles.main.backgroundColor } }} />
    </Stack.Navigator>
  )
}

const Header = ({university}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{university}</Text>
    </View>
  )
}

const clearCache = async () => {
  await AsyncStorage.multiRemove(['user_university', 'user_group', 'user_schedule'])
}

function Profile({ navigation, route }) {

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
      if (route.params) {
        setUniversity(route.params.university_title)
        setGroup(route.params.group.title)
        await AsyncStorage.multiSet([['user_university', university], ['user_group', group]])
      }
    } catch (error) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useFocusEffect(() => {
    loadAfterChange()
  })

  return (
    <View style={styles.container}>
      <Header university={university}/>
      {/* Дополнительный текст и кнопка */}
      <View style={styles.content}>
        <Text style={styles.additionalText}>Группа: {group}</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            navigation.navigate('Universities')
          }}
        >
          <Text style={styles.buttonText1}>Сменить группу</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            //при нажатии на кнопку поменять группу былобыславно
          }}
        >
          <Text style={styles.buttonText2}>Оценить приложение</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button3}
          onPress={() => {
            //при нажатии на кнопку поменять группу былобыславно
          }}
        >
          <Text style={styles.buttonText3}>Поделиться приложением</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonClearCache}
          onPress={() => {
            clearCache()
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
    backgroundColor: "#3D64EC",
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
    color: "#3D64EC",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Medium',
  },
  button1: {
    backgroundColor: "#7393FF",
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
    backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 350,
  },
  buttonText2: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  button3: {
    backgroundColor: "#98AFFF",
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
  buttonClearCache: {
    backgroundColor: "#ffcd5b",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonClearCacheText: {
    color: "black",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  }
});