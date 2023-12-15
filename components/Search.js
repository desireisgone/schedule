import React, { useState } from "react";
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

function Teacher({teacher}) {
  return (
    <TouchableOpacity style={styles.teacher}>
      <Text style={styles.teachertext}>{teacher.fio}</Text>
    </TouchableOpacity>
  );
}

export default function Search() {

  // тут надо будет юзать fetch для подкючения к бэкэнду ну потом сделаем
  const [teachers, setTeachers] = useState([
    {
      id_teacher: 1,
      fio: "Агафонова Нина Юрьевна"
    },
    {
      id_teacher: 2,
      fio: "Поплавский Дмитрий Владиславович"
    },
  ]);

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <StatusBar style={ globalStyles.main } />
      <Header/>
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
    backgroundColor: "#D4DDFB",
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
    backgroundColor: "#98AFFF",
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