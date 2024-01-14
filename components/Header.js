import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity, 
  StyleSheet
} from "react-native";
import { globalStyles } from "../styles/style";

const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const current = (new Date()).getDay()
function HeaderElement({element, onPressFunc}) {
  return (
    <TouchableOpacity style={styles.dayItem} onPress={() => {onPressFunc(element.weekday)}}>
      <Text style={styles.weekday}>{weekdays[element.weekday]}</Text>
      <View style={ (element.weekday === current) ? [globalStyles.currentLesson, styles.daynumber] : styles.daynumber }>
        <Text style={(element.weekday === 0) ? styles.dayseven : styles.day}>{element.day}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Header({ onPressFunc }) {

  const getCurrentWeekDates = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const weekStart = new Date(currentDate)
    const difference = currentDay - 1

    weekStart.setDate(currentDate.getDate() - difference)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      weekDates.push({ day: day.getDate(), weekday: (i + 1) % 7 })
    }
    return weekDates
  }

  const dates = getCurrentWeekDates()

  return (
    <View style={[globalStyles.main, styles.main]}>
      <HeaderElement element={dates[0]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[1]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[2]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[3]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[4]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[5]} onPressFunc={onPressFunc}/>
      <HeaderElement element={dates[6]} onPressFunc={onPressFunc}/>
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
    textAlign: "center",
  },
  day: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
  },
  dayseven: {
    color: '#98AFFF',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
  }
});