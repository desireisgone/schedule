import React, { useEffect, useState } from "react";
import {
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";

interface IDate {
  isCurMon: boolean;
  date: number;
}

interface CalendarWeekProps {
  week: IDate[]
}

interface CalendarMonthProps {
  weeks: IDate[][];
  monthNum: number;
}

interface CalendarListProps {
  dates: {
    id: number;
    weeks: IDate[][]
  }[]
}

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

function getStartOfWeek(date: Date) {
  const dayOfWeek = date.getDay()
  const res = new Date(date)
  res.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
  return res
}

function monthSplit(startOfMonth: Date) {
  const res = []
  let tmpDate = getStartOfWeek(startOfMonth)
  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      week.push({date: tmpDate.getDate(), isCurMon: tmpDate.getMonth() == startOfMonth.getMonth()})
      tmpDate.setDate(tmpDate.getDate() + 1)
    }
    res.push(week)
  }
  return res
}

const CalendarWeek = React.memo<CalendarWeekProps>(({ week }) => {
  return (
    <View style={styles.week}>
      {week.map((item, index) => (
        <TouchableOpacity style={item.isCurMon ? styles.day_of_current_month : styles.day_of_other_month} key={index}>
          <Text style={styles.day_number}>{item.date}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
})

const CalendarMonth = React.memo<CalendarMonthProps>(({ weeks, monthNum }) => {
  return (
    <View style={styles.month}>
      <Text style={styles.month_title}>{months[monthNum]}</Text>
      {weeks.map((item, index) => {
        return <CalendarWeek week={item} key={index}/>
      })}
    </View>
  )
})

const CalendarList = React.memo<CalendarListProps>(({ dates }) => {
  return (
    <View style={styles.calendar_wrapper}>
      <FlatList
        horizontal
        data={dates}
        initialNumToRender={1}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <CalendarMonth weeks={item.weeks} monthNum={item.id}/>}
        pagingEnabled
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
})

export default function Calendar({  }) {
  const [modalVisible, setModalVisible] = useState(false)

  const dates = []
  for (let i = 0; i < 12; i++) {
    dates.push({id: (8 + i) % 12,
                weeks: monthSplit(new Date(2023, 8 + i, 1))})
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.show_modal_button}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.show_modal_text}>{(modalVisible) ? '\u276E' : '\u276F'}</Text>
      </TouchableOpacity>
      {(modalVisible) ? (<CalendarList dates={dates}/>) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  month: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  week: {
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  day_of_current_month: {
    alignItems: 'center',
    width: '12%',
    backgroundColor: 'grey',
    alignContent: 'center',
  },
  day_of_other_month: {
    alignItems: 'center',
    width: '12%',
    backgroundColor: 'lightgrey',
    alignContent: 'center',
  },
  month_title: {
    fontFamily: 'JetBrainsMono-Light',
    fontSize: 16,
  },
  day_number: {
    fontFamily: 'JetBrainsMono-Light',
    fontSize: 14,
  },
  show_modal_button: {
  },
  show_modal_text: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '700',
    transform: [{ rotate: '90deg' }],
  },
  calendar_wrapper: {
    backgroundColor: '#FFFFFF7F',
  },
})