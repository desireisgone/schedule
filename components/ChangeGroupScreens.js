import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import axios from "axios";
import { useTheme } from "./ThemeContext";

export function ScreenUniversities({ navigation, route }) {
  const { currentTheme, changeTheme } = useTheme()
  
  const [universities, setUniversities] = useState(null)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/universities')
      setUniversities(response.data)
    }
    catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
    if (!search) {
      setSearchResult(null)
    } else {
      const filteredUniversities = universities.filter((university) =>
        university.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredUniversities)
    }
  }, [search, universities])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
          <Image source={require("../assets/searchInput.png")}/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)} />
      </View>
      <FlatList data={searchResult || universities} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: currentTheme.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Faculties', { id_university: item.id_university, university_title: item.title })
          }}>
            <Text style={[styles.optionText, {color: currentTheme.white}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}

export function ScreenFaculties({ navigation, route }) {
  const { currentTheme, changeTheme } = useTheme()

  const id_university = route.params.id_university

  const [faculties, setFaculties] = useState(null)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/faculties/${id_university}`)
      setFaculties(response.data)
    }
    catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
    if (!search) {
      setSearchResult(null)
    } else {
      const filteredFaculties = faculties.filter((faculty) =>
        faculty.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredFaculties)
    }
  }, [search, faculties])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
          <Image source={require("../assets/searchInput.png")}/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)}/>
      </View>
      <FlatList data={searchResult || faculties} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: currentTheme.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Groups', { id_faculty: item.id_faculty, university_title: route.params.university_title })
          }}>
            <Text style={[styles.optionText, {color: currentTheme.white}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}

export function ScreenGroups({ navigation, route }) {
  const { currentTheme, changeTheme } = useTheme()
  
  const id_faculty = route.params.id_faculty

  const [groups, setGroups] = useState(null)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/groups/${id_faculty}`)
      setGroups(response.data)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
    if (!search) {
      setSearchResult(null)
    } else {
      const filteredGroups = groups.filter((group) =>
        group.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredGroups)
    }
  }, [search, groups])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
          <Image source={require("../assets/searchInput.png")}/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)}/>
      </View>
      <FlatList data={searchResult || groups} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: currentTheme.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Profile', { group: item, university_title: route.params.university_title })
          }}>
            <Text style={[styles.optionText, {color: currentTheme.white}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 15,
    paddingHorizontal: 15,
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
  container: {
    flex: 1,
  },
  flatListContainer: {
    padding: 20,
    alignItems: "center",
  },
  optionItem: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Medium',
  },
});
