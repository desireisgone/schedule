import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/ChangeScreensStyle.js";

export default function ScreenUniversities({ navigation, route }) {
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
    if (!search) {
      setSearchResult(null)
    } else {
      const filteredUniversities = universities.filter((university) =>
        university.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredUniversities)
    }
  }, [search])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
          <Image source={require("../assets/searchInput.png")}/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)} />
      </View>
      <FlatList data={searchResult || universities} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: currentTheme.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Faculties', { id_university: item.id_university, university_title: item.reduction })
          }}>
            <Text style={[styles.optionText, {color: currentTheme.white}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}