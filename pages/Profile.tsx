import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCache } from "../contexts/CacheContext";
import { ScreenProfileProps } from "../components/types";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import ChangeTheme from "../components/ChangeTheme";

interface HeaderProps {
  university: string;
}

const Header = ({ university }: HeaderProps) => {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)

  return (
    <View style={[styles.header, { backgroundColor: colors.maincolor }]}>
      <Text style={styles.headerText}>{university}</Text>
    </View>
  );
}

export default function Profile({ navigation, route }: ScreenProfileProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const { clearCache, setGroupId } = useCache()
  const [university, setUniversity] = useState<string>('Университет не выбран')
  const [group, setGroup] = useState<string>('не выбрана')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const loadData = async () => {
    try {
      const data = await AsyncStorage.multiGet(['user_university', 'user_group'])
      if (data[0][1] !== null && data[1][1] !== null) {
        setUniversity(data[0][1].toString())
        setGroup(data[1][1].toString())
      }
    } catch (error: any) {
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
    } catch (error: any) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [isVisible])

  useFocusEffect(() => {
    if (route.params) {
      loadAfterChange()
    } else {
      loadData()
    }
  })

  return (
    <View style={styles.container}>
      <Header university={university}/>
      {isVisible && (<ChangeTheme isVisible={isVisible} setIsVisible={setIsVisible}/>)}
      {/* Дополнительный текст и кнопка */}
      <View style={styles.content}>
        <View style={styles.topContainer}>
          <Text style={[styles.additionalText, { color: colors.maincolor }]}>
            Группа: {group}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.buttons_and_lessons },
            ]}
            onPress={() => {
              navigation.navigate('Universities');
            }}
          >
            <Text style={styles.buttonText}>Сменить группу</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          {/*<TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.buttons_and_lessons },
            ]}
            onPress={() => {
              //при нажатии на кнопку поменять группу было бы славно
            }}
          >
            <Text style={styles.buttonText}>Оценить приложение</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.buttons_and_lessons },
            ]}
            onPress={() => {
              //при нажатии на кнопку поменять группу было бы славно
            }}
          >
            <Text style={styles.buttonText}>Поделиться приложением</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.buttons_and_lessons },
            ]}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.buttonText}>Сменить тему</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.alter },
            ]}
            onPress={() => {
              clearCache();
            }}
          >
            <Text style={styles.buttonText}>Очистить кэш</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  header: {
    height: "9%",
    justifyContent: "center",
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  bottomContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 15,
    alignSelf: "flex-end",
  },
  additionalText: {
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Medium',
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: 'JetBrainsMono-Light',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    elevation: 5, //тень
  },
});