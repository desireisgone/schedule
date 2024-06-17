import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "axios";
import TitleHeader from "../components/TitleHeader";
import { ScreenProfileProps } from "../components/types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import ChangeTheme from "../components/ChangeTheme";
import { resetAll, setUserGroup, setUserIdGroup, setUserSchedule, setUserUniversity } from "../store/reducers/userDataReducer";

export default function Profile({ navigation, route }: ScreenProfileProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const { user_group, user_university, user_id_group } = useSelector((state: RootReducer) => state.userDataReducer)
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/lessons/byGroup/' + route.params.group.id_group)
      console.log('Загружено расписание для группы ' + route.params.group.title + '. ID: ' + route.params.group.id_group)
      dispatch(setUserSchedule(response.data))
      console.log('Расписание загружено с сервера')
    } catch (error: any) {
      console.log('Ошибка при выполнении запроса:', error)
    }
  }

  const loadAfterChange = () => {
    try {
      dispatch(setUserUniversity(route.params.university_title))
      dispatch(setUserGroup(route.params.group.title))
      dispatch(setUserIdGroup(route.params.group.id_group.toString()))
      fetchData()
    } catch (error: any) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    if (route.params) {
      loadAfterChange()
    }
  }, [isVisible, route.params])

  return (
    <View style={styles.container}>
      <TitleHeader title={user_university}/>
      {isVisible && (<ChangeTheme isVisible={isVisible} setIsVisible={setIsVisible}/>)}
      {/* Дополнительный текст и кнопка */}
      <View style={styles.content}>
        <View style={styles.topContainer}>
          <Text style={[styles.additionalText, { color: colors.maincolor }]}>
            Группа: {user_group}
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
              dispatch(resetAll())
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