import React, { useState, useEffect } from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  Image,
} from "react-native";
import Header from "../components/Header.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext.js";
import { useCache } from "../contexts/CacheContext.js";
import { useFocusEffect } from "@react-navigation/native";
import { themes } from '../styles/style.js';
import { Lesson, SlideLesson } from "../components/Lesson.js";
import { styles } from "../styles/MainPageStyle.js";

export default function Main() {
  const { currentTheme, changeTheme } = useTheme()
  const { groupId } = useCache()
  const [chosenDay, setChosenDay] = useState((new Date()).getDay())
  const [responseData, setResponseData] = useState(null)
  const [chis_znam, setCZ] = useState()
  const [subgroups, setSubgroups] = useState()

  const setWeekType = () => {
    const firstSeptember = new Date('2023-09-01')
    const mondayOfFirstWeek = new Date(firstSeptember)
    mondayOfFirstWeek.setDate(firstSeptember.getDate() - firstSeptember.getDay() + 1) // дата понедельника недели с 1 сентября

    const currentDate = new Date()
    const differenceInDays = Math.floor((currentDate - mondayOfFirstWeek) / (1000 * 60 * 60 * 24))
    const currentWeekNumber = Math.floor(differenceInDays / 7)
    setCZ(currentWeekNumber % 2 === 0 ? 'чис.' : 'знам.')
  }

  const onPressFunc = (newDay) => {
    setChosenDay(newDay)
  }

  const subgroupSearch = (res) => {
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
      const response = await axios.get(`http://localhost:3000/api/lessons/byGroup/${groupId ? groupId : "0"}`)
      subgroupSearch(response.data)
      //await AsyncStorage.setItem('user_schedule', JSON.stringify(response.data))
      console.log('Расписание загружено с сервера')
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
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
    } catch (error) {
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
      <StatusBar style={ currentTheme.maincolor } />
      <Header onPressFunc={onPressFunc} currentTheme={currentTheme} chosenDay={chosenDay}/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
        <Text style={[styles.weektype, {color: currentTheme.maincolor}]}>{ chis_znam === 'чис.' ? "Числитель" : "Знаменатель" }</Text>
        <TouchableOpacity style={{ right: 20 }}>
          <Image
            style={{ width: 20, height: 20, margin: 10}}
            source={currentTheme === themes.green ? (require('../assets/filter_2.png')) : (require('../assets/filter.png'))}
          />
        </TouchableOpacity>
      </View>
      <FlatList style={{ width: "100%" }} data={responseData} renderItem={( {item} ) => {
        if (item.weekday === chosenDay && (item.chis_znam === chis_znam || item.chis_znam === '')) {
          if (item.subgroup !== '') {
            return <SlideLesson elements={subgroups.get(item.start_time + item.weekday + item.chis_znam)} currentTheme={currentTheme}/>
          }
          return <Lesson element={item} currentTheme={currentTheme}/>
        }
        return
      }}/>
    </SafeAreaView>
  );
}
