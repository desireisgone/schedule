import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity, 
  StyleSheet
} from "react-native";

const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export default function Header({ onPressFunc, currentTheme, chosenDay }) {

  const HeaderElement = ({element}) => {
    return (
      <TouchableOpacity style={styles.dayItem} onPress={() => {onPressFunc(element.weekday)}}>
        <Text style={[styles.weekday, {color: currentTheme.light_for_search_and_daynumber}]}>{weekdays[element.weekday]}</Text>
        <View style={ (element.weekday === chosenDay) ? [{backgroundColor: currentTheme.orange}, styles.daynumber] : styles.daynumber }>
          <Text style={(element.weekday === 0) ? [styles.dayseven, {color: currentTheme.light_for_search_and_daynumber}] : styles.day}>{element.day}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const getCurrentWeekDates = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay() === 0 ? 7 : currentDate.getDay()
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
    <View style={[{backgroundColor: currentTheme.maincolor}, styles.main]}>
      <HeaderElement element={dates[0]}/>
      <HeaderElement element={dates[1]}/>
      <HeaderElement element={dates[2]}/>
      <HeaderElement element={dates[3]}/>
      <HeaderElement element={dates[4]}/>
      <HeaderElement element={dates[5]}/>
      <HeaderElement element={dates[6]}/>
    </View>
  )
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
    color: '#a7c1ae',
    // color: '#98AFFF',
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
    color: '#a7c1ae',
    // color: '#98AFFF',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
  }
})