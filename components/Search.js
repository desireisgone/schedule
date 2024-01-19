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
  TextInput 
} from "react-native";
import { globalStyles } from "../styles/style";
import Header from "./Header";
import axios from "axios";

function Teacher({teacher}) {
  return (
    <TouchableOpacity style={styles.teacher}>
      <Text style={styles.teachertext}>{teacher.full_name}</Text>
    </TouchableOpacity>
  );
}

export default function Search() {

  const [teachers, setTeachers] = useState(null)

  const [search, setSearch] = useState("")

  const [currentDay, setCurrentDat] = useState((new Date()).getDay())

  const onPressFunc = (newDay) => {
    setCurrentDat(newDay)
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
    fetchData()
  }, [])

  return (
    <SafeAreaView>
      <StatusBar style={ globalStyles.main } />
      <Header onPressFunc={onPressFunc}/>
      <View style={styles.searchbar}>
        <Image source={require("../assets/searchInput.png")}/>
        <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" />
      </View>
      <FlatList data={teachers} renderItem={( {item} ) => {
        return <Teacher teacher={item}/>
      }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 10,
    backgroundColor: "#cfe3d4",
    // backgroundColor: "#D4DDFB",
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
    backgroundColor: "#9ec1a7",
    // backgroundColor: "#98AFFF",
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