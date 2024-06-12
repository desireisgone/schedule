import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import axios from "axios";
import { styles } from "../styles/ChangeScreensStyle.js";
import { ScreenUniversitiesProps, University } from "./types.tsx";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store.tsx";
import { Icon } from "./Icon.js";

export default function ScreenUniversities({ navigation, route }: ScreenUniversitiesProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const [universities, setUniversities] = useState<University[]>([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState<University[] | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/universities')
      setUniversities(response.data)
    }
    catch (error: any) {
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
    <View style={[styles.container, {backgroundColor: colors.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: colors.light_for_search_and_daynumber}]}>
        <Icon name='search' size={20} style={{ color: 'white' }}/>
        <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)} />
      </View>
      <FlatList data={searchResult || universities} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: colors.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Faculties', { id_university: item.id_university, university_title: item.reduction })
          }}>
            <Text style={[styles.optionText, {color: colors.background}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}