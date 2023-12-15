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

const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const current = (new Date()).getDay()
function HeaderElement({element}) {
  return (
    <TouchableOpacity style={styles.dayItem}>
      <Text style={styles.weekday}>{weekdays[element.weekday]}</Text>
      <View style={ (element.weekday === current) ? [globalStyles.currentLesson, styles.daynumber] : styles.daynumber }>
        <Text style={(element.weekday === 0) ? styles.dayseven : styles.day}>{element.day}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Header() {

  const [dates, setDates] = useState([
    {day: 11, weekday: 1},
    {day: 12, weekday: 2},
    {day: 13, weekday: 3},
    {day: 14, weekday: 4},
    {day: 15, weekday: 5},
    {day: 16, weekday: 6},
    {day: 17, weekday: 0},
  ])
  return (
    <View style={[globalStyles.main, styles.main]}>
      <HeaderElement element={dates[0]}/>
      <HeaderElement element={dates[1]}/>
      <HeaderElement element={dates[2]}/>
      <HeaderElement element={dates[3]}/>
      <HeaderElement element={dates[4]}/>
      <HeaderElement element={dates[5]}/>
      <HeaderElement element={dates[6]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  daynumber: {
    padding: 5,
    borderRadius: 20,
  },
  dayItem: {
    margin: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekday: {
    color: '#98AFFF',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    wordWrap: 'break-word',
    textAlign: "center",
  },
  day: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    wordWrap: 'break-word',
  },
  dayseven: {
    color: '#98AFFF',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    wordWrap: 'break-word',
  }
});