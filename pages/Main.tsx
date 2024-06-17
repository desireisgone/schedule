import React, { useState, useEffect } from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { Lesson, SlideLesson } from "../components/Lesson";
import { styles } from "../styles/MainPageStyle";
import { Icon } from "../components/Icon";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import Calendar from "../components/Calendar";
import DayPicker from "../components/DayPicker";

export default function Main() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const { user_schedule } = useSelector((state: RootReducer) => state.userDataReducer)
  const [chosenDay, setChosenDay] = useState<number>((new Date()).getDay())
  const [chis_znam, setCZ] = useState<string>()

  const setWeekType = () => {
    const firstSeptember = new Date('2023-09-01')
    const mondayOfFirstWeek = new Date(firstSeptember)
    mondayOfFirstWeek.setDate(firstSeptember.getDate() - firstSeptember.getDay() + 1) // дата понедельника недели с 1 сентября

    const currentDate = new Date()
    const differenceInDays = Math.floor((currentDate.valueOf() - mondayOfFirstWeek.valueOf()) / (1000 * 60 * 60 * 24))
    const currentWeekNumber = Math.floor(differenceInDays / 7)
    setCZ(currentWeekNumber % 2 === 0 ? 'чис.' : 'знам.')
  }

  useEffect(() => {
    setWeekType()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.maincolor}/>
      <DayPicker onPressFunc={setChosenDay} chosenDay={chosenDay}/>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={[styles.weektype, {color: colors.maincolor}]}>{ chis_znam === 'чис.' ? "Числитель" : "Знаменатель" }</Text>
        {/*<TouchableOpacity style={{ right: 20 }}>
          <Icon name='filter' size={25} style={{margin: 10, color: colors.maincolor}}/>
        </TouchableOpacity>*/}
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={user_schedule.mainSchedule[chosenDay - 1]}
        renderItem={({ item }) => {
          return (item.chis_znam === chis_znam || item.chis_znam === '')
            ? (item.subgroup == '')
                ? (<Lesson element={item}/>)
                : (<SlideLesson elements={user_schedule.lessonsBySubgroups[item.start_time + item.weekday + item.chis_znam]}/>)
            : null
        }}
      />
    </SafeAreaView>
  );
}
