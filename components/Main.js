import React, { useState, useEffect } from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, Image 
} from "react-native";
import Header from "./Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./ThemeContext";
import { useCache } from "./CacheContext";
import { useFocusEffect } from "@react-navigation/native";

const date = new Date()
const currentDateTime = { hour: date.getHours(), minutes: date.getMinutes(), dayNum: date.getDay() } //{hour: 10, minutes: 31, dayNum: 5}//

const checkTime = (startTime, endTime) => {
  var startTime = String(startTime).split(':').map(Number)
  var endTime = String(endTime).split(':').map(Number)
  return !((startTime[0] > currentDateTime.hour || startTime[0] == currentDateTime.hour && startTime[1] > currentDateTime.minutes) ||
           (endTime[0] < currentDateTime.hour || endTime[0] == currentDateTime.hour && endTime[1] < currentDateTime.minutes))
}

function Lesson({element, currentTheme}) {
  var chk = checkTime(element.start_time, element.end_time) && currentDateTime.dayNum == element.weekday
  return (
    <TouchableOpacity style={[ (chk) ? {backgroundColor: currentTheme.orange} : {backgroundColor: currentTheme.buttons_and_lessons}, styles.lesson ]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, (chk) ? {color: "black"} : {}]}>{element.start_time} - {element.end_time}</Text>
        <Text style={[styles.type, (chk) ? {color: "black"} : {}]}>{element.type}</Text>
      </View>
      <Text style={[styles.title, (chk) ? {color: "black"} : {}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.teacher, (chk) ? {color: "black"} : {}]}>{element.full_name}</Text>
        <Text style={[styles.place, (chk) ? {color: "black"} : {}]}>{element.place}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Main() {

  const { currentTheme, changeTheme } = useTheme()
  const { groupId } = useCache()

  const getWeekType = () => {
    return "Числитель"
  }

  const [chosenDay, setChosenDay] = useState((new Date()).getDay())
  const [responseData, setResponseData] = useState(null)

  const onPressFunc = (newDay) => {
    setChosenDay(newDay)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/lessons/byGroup/${groupId ? groupId : "0"}`)
      setResponseData(response.data)
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
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadData()
  }, [groupId]))

  return (
    <SafeAreaView>
      <StatusBar style={ currentTheme.maincolor } />
      <Header onPressFunc={onPressFunc} currentTheme={currentTheme} chosenDay={chosenDay}/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
        <Text style={[styles.weektype, {color: currentTheme.maincolor}]}>{ getWeekType() }</Text>
        <TouchableOpacity style={{ right: 20 }}>
          <Image
            style={{ width: 20, height: 20, margin: 10}}
            source={require("../assets/filter_2.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList style={{ width: "100%" }} data={responseData} renderItem={( {item} ) => {
        if (item.weekday === chosenDay) {
          return <Lesson element={item} currentTheme={currentTheme}/>
        }
        return
      }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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