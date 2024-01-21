import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "axios";
import { themes } from "../styles/style";
import { useTheme } from "./ThemeContext";

export function ScreenUniversities({ navigation, route }) {
  const { currentTheme, changeTheme } = useTheme()
  
  const [universities, setUniversities] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/universities')
      setUniversities(response.data)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <FlatList data={universities} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/faculties/${id_university}`)
      setFaculties(response.data)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <FlatList data={faculties} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
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
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.maincolor}]}>
      <FlatList data={groups} contentContainerStyle={styles.flatListContainer} renderItem={({item}) => {
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
