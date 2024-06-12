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
import { ScreenGroupsProps, Group } from "./types.tsx";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store.tsx";
import { Icon } from "./Icon.js";

export default function ScreenGroups({ navigation, route }: ScreenGroupsProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const id_faculty = route.params.id_faculty
  const [groups, setGroups] = useState<Group[]>([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState<Group[] | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/groups/${id_faculty}`)
      setGroups(response.data)
    } catch (error: any) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    if (!search) {
      setSearchResult(null)
    } else {
      const filteredGroups = groups.filter((group) =>
        group.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filteredGroups)
    }
  }, [search])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: colors.maincolor}]}>
      <View style={[styles.searchbar, {backgroundColor: colors.light_for_search_and_daynumber}]}>
        <Icon name='search' size={20} style={{ color: 'white' }}/>
        <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" onChangeText={(text) => setSearch(text)}/>
      </View>
      <FlatList data={searchResult || groups} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.optionItem, {backgroundColor: colors.buttons_and_lessons}]} onPress={() => {
            navigation.navigate('Profile', { group: item, university_title: route.params.university_title })
          }}>
            <Text style={[styles.optionText, {color: colors.background}]}>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}