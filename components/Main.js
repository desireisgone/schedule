import React, { useState, useEffect, lazy } from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import Header from "./Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./ThemeContext";
import { useCache } from "./CacheContext";
import { useFocusEffect } from "@react-navigation/native";
import { themes } from '../styles/style';

const date = new Date()
const currentDateTime = { hour: date.getHours(), minutes: date.getMinutes(), dayNum: date.getDay() } //{hour: 10, minutes: 31, dayNum: 5}//

const checkTime = (startTime, endTime) => {
  var startTime = String(startTime).split(':').map(Number)
  var endTime = String(endTime).split(':').map(Number)
  return !((startTime[0] > currentDateTime.hour || startTime[0] == currentDateTime.hour && startTime[1] > currentDateTime.minutes) ||
           (endTime[0] < currentDateTime.hour || endTime[0] == currentDateTime.hour && endTime[1] < currentDateTime.minutes))
}

function Lesson({ element, currentTheme }) {
  var chk = checkTime(element.start_time, element.end_time) && currentDateTime.dayNum == element.weekday;
  return (
    <TouchableOpacity style={[chk ? { backgroundColor: currentTheme.orange } : { backgroundColor: currentTheme.buttons_and_lessons }, styles.lesson]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, chk ? { color: "black" } : {}]}>{element.start_time} - {element.end_time}</Text>
        <Text style={[styles.type, chk ? { color: "black" } : {}]}>{element.type}</Text>
      </View>
      <Text style={[styles.title, chk ? { color: "black" } : {}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.teacher, chk ? { color: "black" } : {}]}>{element.full_name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text style={[styles.place, chk ? { color: "black" } : {}]}>{element.place}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SlideLessonRender({ element, chk, currentTheme }) {
  return (
    <TouchableOpacity style={[{ backgroundColor: chk ? currentTheme.orange : currentTheme.buttons_and_lessons }, styles.slide]}> 
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, chk ? { color: "black" } : {}]}>{element.start_time} - {element.end_time}</Text>

        {/* ВЫВОД НОМЕРА ПОДГРУППЫ. ПОТОМ МБ ПЕРЕДЕЛАТЬ */}
        <Text style={[styles.type, chk ? { color: "black" } : {}]}>{element.subgroup}</Text>


        <Text style={[styles.type, chk ? { color: "black" } : {}]}>{element.type}</Text>
      </View>
      <Text style={[styles.title, chk ? { color: "black" } : {}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.teacher, chk ? { color: "black" } : {}]}>{element.full_name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text style={[styles.place, chk ? { color: "black" } : {}]}>{element.place}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function SlideLesson({ elements, currentTheme }) {
  var chk = checkTime(elements[0].start_time, elements[0].end_time) && currentDateTime.dayNum == elements[0].weekday;
  return (
    <View style={[styles.lesson, { padding: 0 }]}>
      <FlatList
        horizontal
        data={elements}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => { return <SlideLessonRender element={item} chk={chk} len={elements.length} currentTheme={currentTheme}/> }}
        pagingEnabled
        snapToAlignment="center"
      />
    </View>
  )
}

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

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: "center",
    padding: 10,
  },
  lesson: {
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '700',
    letterSpacing: 0.75,
    marginBottom: 10,
    padding: 5,
  },
  time: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
    fontWeight: '500',
    letterSpacing: 0.60,
    padding: 5,
  },
  place: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Light',
    fontWeight: '500',
    letterSpacing: 0.30,
    alignSelf: "flex-end",
    padding: 5,
  },
  teacher: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '700',
    letterSpacing: 0.45,
    padding: 5,
  },
  type: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    padding: 5,
  },
  weektype: {
    color: '#63836b',
    // color: '#3d64ec',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '700',
    letterSpacing: 0.60,
    marginLeft: 20,
  }
})