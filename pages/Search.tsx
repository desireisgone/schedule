import React, { useState, useEffect } from "react";
import {
  Image,
  View, 
  SafeAreaView, 
  Text,  
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  TextInput,
} from "react-native"
import Header from "../components/Header";
import axios from "axios";
import { TeacherType } from "../components/types";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";

interface TeacherProps {
  teacher: TeacherType;
  color: string
}

function Teacher({ teacher, color }: TeacherProps) {
  return (
    <TouchableOpacity style={[styles.teacher, {backgroundColor: color}]}>
      <Text style={styles.teachertext}>{teacher.full_name}</Text>
    </TouchableOpacity>
  );
}

export default function Search() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const [teachers, setTeachers] = useState<TeacherType[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchResult, setSearchResult] = useState<TeacherType[]>([])
  const [chosenDay, setChosenDay] = useState<number>(new Date().getDay());
  
  const onPressFunc = (newDay: number) => {
    setChosenDay(newDay);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/teachers')
      setTeachers(response.data)
    } catch (error: any) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    if (!search) {
      setSearchResult([])
    }
    else {
      const filteredTeachers = teachers.filter((teacher) =>
        teacher.full_name.toLowerCase().includes(search.toLowerCase())
      )
      setSearchResult(filteredTeachers)
    }
  }, [search])
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={ colors.maincolor } />
      <Header onPressFunc={onPressFunc} chosenDay={chosenDay}/>
      <View style={[styles.searchbar, {backgroundColor: colors.light_for_search_and_daynumber}]}>
        <Image source={require("../assets/searchInput.png")}/>
        <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)} />
      </View>
      <FlatList
        data={searchResult || teachers}
        renderItem={({ item }) => <Teacher teacher={item} color={colors.buttons_and_lessons} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  textinput: {
    color: "white",
    verticalAlign: "middle",
    display: "flex",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
    fontWeight: '500',
  },
  teacher: {
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
  },
  teachertext: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Mideum',
    margin: 5,
  }
})