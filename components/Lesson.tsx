import React from "react";
import {
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
} from "react-native";
import { styles } from "../styles/MainPageStyle.js";
import { LessonType } from "./types.tsx";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store.tsx";

interface LessonProps {
  element: LessonType;
}

interface SlideLessonProps {
  element: LessonType;
  chk: boolean;
}

interface SlideProps {
  elements: LessonType[] | undefined;
}

const date = new Date()
const currentDateTime = { hour: date.getHours(), minutes: date.getMinutes(), dayNum: date.getDay() } //{hour: 10, minutes: 31, dayNum: 5}//

const checkTime = (startTimeStr: string, endTimesStr: string) => {
  var startTime = startTimeStr.split(':').map(Number)
  var endTime = endTimesStr.split(':').map(Number)
  return !((startTime[0] > currentDateTime.hour || startTime[0] == currentDateTime.hour && startTime[1] > currentDateTime.minutes) ||
           (endTime[0] < currentDateTime.hour || endTime[0] == currentDateTime.hour && endTime[1] < currentDateTime.minutes))
}

export function Lesson({ element }: LessonProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)

  var chk = checkTime(element.start_time, element.end_time) && currentDateTime.dayNum == element.weekday;
  return (
    <TouchableOpacity style={[chk ? { backgroundColor: colors.alter } : { backgroundColor: colors.buttons_and_lessons }, styles.lesson]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, chk ? { color: "black" } : {}]}>{element.start_time} - {element.end_time}</Text>
        <Text style={[styles.type, chk ? { color: "black" } : {}]}>{element.type}</Text>
      </View>
      <Text style={[styles.title, chk ? { color: "black" } : {}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.teacher, chk ? { color: "black" } : {}]}>{element.full_name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text style={[styles.place, chk ? { color: "black" } : {}]}>{element.place}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SlideLessonRender({ element, chk }: SlideLessonProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)

  return (
    <TouchableOpacity style={[{ backgroundColor: chk ? colors.alter : colors.buttons_and_lessons }, styles.slide]}> 
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.time, chk ? { color: "black" } : {}]}>{element.start_time} - {element.end_time}</Text>

        <Text style={[styles.type, chk ? { color: "black" } : {}]}>{element.type}</Text>
        <View style={{ position: 'absolute', right: 0, top: 30 }}>
          <Text style={[styles.time, chk ? { color: "black", fontSize: 14 } : { fontSize: 14 }]}>{element.subgroup}</Text>
        </View>

      </View>
      <Text style={[styles.title, chk ? { color: "black", top: 10 } : {top: 10}]}>{element.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.teacher, chk ? { color: "black" } : {}]}>{element.full_name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text style={[styles.place, chk ? { color: "black" } : {}]}>{element.place}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export function SlideLesson({ elements }: SlideProps) {
  if (elements) {
    var chk = checkTime(elements[0].start_time, elements[0].end_time) && currentDateTime.dayNum == elements[0].weekday;
    return (
      <View style={[styles.lesson, { padding: 0 }]}>
        <FlatList
          horizontal
          data={elements}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => { return <SlideLessonRender element={item} chk={chk}/> }}
          pagingEnabled
          snapToAlignment="center"
        />
      </View>
    )
  }
}
