import React, { useState } from "react";
import {
  Button,
  View, 
  SafeAreaView, 
  Text, 
  ScrollView, 
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, Image 
} from "react-native";
import { globalStyles } from "../styles/style";
import Header from "./Header";

const currentTime = {hour: 10, minutes: 31}

const checkTime = (startTime, endTime) => {
  var startTime = String(startTime).split(':').map(Number)
  var endTime = String(endTime).split(':').map(Number)
  return !((startTime[0] > currentTime.hour || startTime[0] == currentTime.hour && startTime[1] > currentTime.minutes) ||
           (endTime[0] < currentTime.hour || endTime[0] == currentTime.hour && endTime[1] < currentTime.minutes))
}

function Lesson({element}) {
  var chk = checkTime (element.start_time, element.end_time)
  return (
    <TouchableOpacity style={[ (chk) ? globalStyles.currentLesson : globalStyles.lesson, styles.lesson ]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, (chk) ? {color: "black"} : {}]}>{element.start_time} - {element.end_time}</Text>
        <Text style={[styles.type, (chk) ? {color: "black"} : {}]}>{element.type}</Text>
      </View>
      <Text style={[styles.title, (chk) ? {color: "black"} : {}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.teacher, (chk) ? {color: "black"} : {}]}>{element.teacher}</Text>
        <Text style={[styles.place, (chk) ? {color: "black"} : {}]}>{element.place}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Main() {

  const getWeekType = () => {
    return "Числитель"
  }

  // тут надо будет юзать fetch для подкючения к бэкэнду ну потом сделаем
  const [days, setDays] = useState([
    {
      id_lesson: 1,
      title: "Методы вычислений",
      start_time: "8:20",
      end_time: "9:50",
      teacher: "Поплавский Д. В.",
      type: "Лек.",
      place: "12 корпус ауд. 333"
    },
    {
      id_lesson: 2,
      title: "Теория вероятности",
      start_time: "10:00",
      end_time: "11:35",
      teacher: "Агафонова Н. Ю.",
      type: "Лек.",
      place: "12 корпус ауд. 304"
    },
    {
      id_lesson: 3,
      title: "Методы вычислений",
      start_time: "12:05",
      end_time: "13:40",
      teacher: "Поплавский Д. В.",
      type: "Пр.",
      place: "12 корпус ауд. 333"
    },
  ]);

  return (
    <SafeAreaView>
      <StatusBar style={ globalStyles.main } />
      <Header/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10}}>
        <Text style={styles.weektype}>{ getWeekType() }</Text>
        <TouchableOpacity style={{ right: 20 }}>
          <Image style={{ width: 20, height: 20, margin: 10 }} source={require("../assets/filter.png")}/>
        </TouchableOpacity>
      </View>
      <FlatList style={{ width: "100%" }} data={days} renderItem={( {item} ) => {
        return <Lesson element={item}/>
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
    color: '#3d64ec',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '700',
    letterSpacing: 0.60,
    marginLeft: 20,
  }
})