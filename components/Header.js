import React from "react";
import DayPicker from "./DayPicker.js";
import Calendar from "./Calendar.js";
import { View, StyleSheet } from "react-native";

export default function Header({ onPressFunc, currentTheme, chosenDay }) {
  return (
    <View style={[styles.container]}>
      <DayPicker onPressFunc={onPressFunc} currentTheme={currentTheme} chosenDay={chosenDay}/>
      <Calendar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '13%',
    flexDirection: 'column',
  }
})