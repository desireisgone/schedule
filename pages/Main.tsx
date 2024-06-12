import React, { useState, useEffect } from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Lesson, SlideLesson } from "../components/Lesson";
import { styles } from "../styles/MainPageStyle";
import { Icon } from "../components/Icon";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import { useCache } from "../contexts/CacheContext";
import { LessonType } from "../components/types";
import Calendar from "../components/Calendar";
import DayPicker from "../components/DayPicker";

export default function Main() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const { groupId } = useCache()
  const [chosenDay, setChosenDay] = useState<number>((new Date()).getDay())
  const [responseData, setResponseData] = useState<LessonType[]>([])
  const [chis_znam, setCZ] = useState<string>()
  const [subgroups, setSubgroups] = useState<Map<string, LessonType[]> | null>()

  const setWeekType = () => {
    const firstSeptember = new Date('2023-09-01')
    const mondayOfFirstWeek = new Date(firstSeptember)
    mondayOfFirstWeek.setDate(firstSeptember.getDate() - firstSeptember.getDay() + 1) // дата понедельника недели с 1 сентября

    const currentDate = new Date()
    const differenceInDays = Math.floor((currentDate.valueOf() - mondayOfFirstWeek.valueOf()) / (1000 * 60 * 60 * 24))
    const currentWeekNumber = Math.floor(differenceInDays / 7)
    setCZ(currentWeekNumber % 2 === 0 ? 'чис.' : 'знам.')
  }

  const onPressFunc = (newDay: number) => {
    setChosenDay(newDay)
  }

  const subgroupSearch = (res: LessonType[]) => {
    let multiLessons = new Map() // список массивов с одинаковыми парами для разных подгрупп
    let singleLessons = [] // список пар без подгрупп, либо по одной подгруппе из каждой пар с множеством подгрупп
    for (let lesson of res) {
      if (lesson.subgroup !== '') {
        let key = lesson.start_time + lesson.weekday.toString() + lesson.chis_znam
        if (multiLessons.get(key)) {
          multiLessons.set(key, [...multiLessons.get(key), ...[lesson]])
        }
        else {
          multiLessons.set(key, [lesson])
          singleLessons.push(lesson)
        }
      }
      else {
        singleLessons.push(lesson)
      }
    }
    setSubgroups(multiLessons)
    setResponseData(singleLessons)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/lessons/byGroup/${groupId}`)
      subgroupSearch(response.data)
      //await AsyncStorage.setItem('user_schedule', JSON.stringify(response.data))
      console.log('Расписание загружено с сервера')
    } catch (error: any) {
      console.log('Ошибка при выполнении запроса:', error.message)
    }
  }

  const loadData = async () => {
    try {
      const schedule = await AsyncStorage.getItem('user_schedule')
      if (schedule !== null) {
        setResponseData(JSON.parse(schedule))
        console.log('Расписание загружено из кэша')
      }
      else {
        fetchData()
      }
    } catch (error: any) {
      console.log('Ошибка при загрузке данных из кэша', error.message)
    }
  }

  useEffect(() => {
    loadData()
    setWeekType()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadData()
  }, [groupId]))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.maincolor}/>
      
      <DayPicker onPressFunc={onPressFunc} chosenDay={chosenDay}/>
      <Calendar/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={[styles.weektype, {color: colors.maincolor}]}>{ chis_znam === 'чис.' ? "Числитель" : "Знаменатель" }</Text>
        <TouchableOpacity style={{ right: 20 }}>
          <Icon name='filter' size={25} style={{margin: 10, color: colors.maincolor}}/>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={responseData}
        renderItem={({ item }) => {
          if (item.weekday === chosenDay && (item.chis_znam === chis_znam || item.chis_znam === '')) {
            if (item.subgroup !== '') {
              return <SlideLesson elements={subgroups?.get(item.start_time + item.weekday + item.chis_znam)}/>
            }
            return <Lesson element={item}/>
          }
          return null
        }}
      />
      
    </SafeAreaView>
  );
}
