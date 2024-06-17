import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity, 
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";

interface DayPickerProps {
  onPressFunc: Function;
  chosenDay: number;
}

interface DayElementProps {
  onPressFunc: Function;
  isChosen: boolean;
  element: {
    day: number;
    weekday: number;
  }
}

const getCurrentWeekDates = (currentDate: Date) => {
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

const DayElement = React.memo(({ element, isChosen, onPressFunc }: DayElementProps) => {
  const weekdays = useMemo(() => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], [])
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  let colorOfDayNumber = ''
  if (isChosen) colorOfDayNumber = colors.chosen_text
  else if (element.weekday === 0) colorOfDayNumber = colors.light_for_search_and_daynumber
  else colorOfDayNumber = 'white'

  return (
    <TouchableOpacity
      style={ [styles.dayItem, isChosen ? {backgroundColor: colors.alter} : {}] }
      onPress={() => {onPressFunc(element.weekday)}}
    >
      <Text
        style={ [styles.weekday, isChosen
                                   ? {color: colors.chosen_text} 
                                   : {color: colors.light_for_search_and_daynumber}] }
      >{weekdays[element.weekday]}</Text>
      <Text style={[styles.day, {color: colorOfDayNumber}]}>{element.day}</Text>
    </TouchableOpacity>
  )
})

export default React.memo(function DayPicker({ onPressFunc, chosenDay }: DayPickerProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const dates = useMemo(() => getCurrentWeekDates(new Date), [])
  
  return (
    <View style={[{backgroundColor: colors.maincolor}, styles.main]}>
      {dates.map((item, index) =>
        <DayElement
          element={item}
          isChosen={item.weekday == chosenDay}
          onPressFunc={onPressFunc}
          key={index}
        />)}
    </View>
  )
})

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