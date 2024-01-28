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
  ScrollView
} from "react-native"
import { globalStyles } from "../styles/style"
import Header from "./Header";
import axios from "axios";
import { useTheme } from "./ThemeContext";

function Teacher({teacher, currentTheme}) {
  return (
    <TouchableOpacity style={[styles.teacher, {backgroundColor: currentTheme.buttons_and_lessons}]}>
      <Text style={styles.teachertext}>{teacher.full_name}</Text>
    </TouchableOpacity>
  );
}

export default function Search() {

  const { currentTheme, changeTheme } = useTheme()

  const [teachers, setTeachers] = useState([])

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const [currentDay, setCurrentDay] = useState((new Date()).getDay())

  const onPressFunc = (newDay) => {
    setCurrentDay(newDay)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/teachers')
      setTeachers(response.data)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    if (!search) {
      setSearchResult(null)
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
      <StatusBar style={ globalStyles.main } />
      <Header onPressFunc={onPressFunc} currentTheme={currentTheme}/>
      <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
        <Image source={require("../assets/searchInput.png")}/>
        <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)} />
      </View>
      <FlatList data={searchResult || teachers}
                renderItem={({ item }) => <Teacher teacher={item} currentTheme={currentTheme} />}
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