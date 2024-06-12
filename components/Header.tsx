import React from "react";
import DayPicker from "./DayPicker";
import Calendar from "./Calendar";
import { View, StyleSheet } from "react-native";

interface HeaderProps {
  onPressFunc: Function;
  chosenDay: number;
}

export default function Header({ onPressFunc, chosenDay }: HeaderProps) {
  return (
    <View style={[styles.container]}>
      <DayPicker onPressFunc={onPressFunc} chosenDay={chosenDay}/>
      <Calendar/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '13%',
    //backgroundColor: 'red',
    flexDirection: 'column',
  }
})