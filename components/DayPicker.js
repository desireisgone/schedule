import React from "react";
import {
  View,
  Text,
  TouchableOpacity, 
  StyleSheet
} from "react-native";

const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export default function DayPicker({ onPressFunc, currentTheme, chosenDay }) {

  const DayElement = ({element}) => {
    let colorOfDayNumber = ''
    if (element.weekday === chosenDay) colorOfDayNumber = currentTheme.chosen_text
    else if (element.weekday === 0) colorOfDayNumber = currentTheme.light_for_search_and_daynumber
    else colorOfDayNumber = 'white'

    return (
      <TouchableOpacity
        style={ [styles.dayItem, (element.weekday === chosenDay) ? {backgroundColor: currentTheme.orange} : {}] }
        onPress={() => {onPressFunc(element.weekday)}}
      >
        <Text
          style={ [styles.weekday, (element.weekday === chosenDay) 
                                   ? {color: currentTheme.chosen_text} 
                                   : {color: currentTheme.light_for_search_and_daynumber}] }
        >{weekdays[element.weekday]}</Text>
        <Text style={[styles.day, {color: colorOfDayNumber}]}>{element.day}</Text>
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
      {dates.map((item, index) => <DayElement element={item} key={index}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    textAlign: "center",
  },
  day: {
    padding: 5,
    alignContent: 'center',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
  },
})