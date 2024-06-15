import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import TitleHeader from "../components/TitleHeader";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenProfileProps } from "../components/types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import ChangeTheme from "../components/ChangeTheme";
import { resetAll, setUserGroup, setUserIdGroup, setUserUniversity } from "../store/reducers/userDataReducer";

export default function Profile({ navigation, route }: ScreenProfileProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const { user_group, user_university, user_id_group } = useSelector((state: RootReducer) => state.userDataReducer)
  const dispatch = useDispatch()
  //const [university, setUniversity] = useState<string>('Университет не выбран')
  //const [group, setGroup] = useState<string>('не выбрана')
  const [isVisible, setIsVisible] = useState<boolean>(false)

  //const loadData = async () => {
  //  try {
  //    const data = await AsyncStorage.multiGet(['user_university', 'user_group'])
  //    if (data[0][1] !== null && data[1][1] !== null) {
  //      setUniversity(data[0][1].toString())
  //      setGroup(data[1][1].toString())
  //    }
  //  } catch (error: any) {
  //    console.log('Ошибка при загрузке данных из кэша', error.message)
  //  }
  //}

  const loadAfterChange = async () => {
    try {
      dispatch(setUserUniversity(route.params.university_title))
      dispatch(setUserGroup(route.params.group.title))
      //const newGroupId = ()
      //await AsyncStorage.multiSet([['user_university', university], ['user_group', group], ['user_id_group', newGroupId]])
      dispatch(setUserIdGroup(route.params.group.id_group.toString()))
    } catch (error: any) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    //loadData()
  }, [isVisible])

  useFocusEffect(() => {
    if (route.params) {
      loadAfterChange()
    } else {
      //loadData()
    }
  })

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