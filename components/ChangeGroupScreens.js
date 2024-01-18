import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "axios";

export function ScreenUniversities({ navigation, route }) {
  
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
    <View>
      <FlatList data={universities} renderItem={({item}) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Faculties', { id_university: item.id_university, university_title: item.title })
          }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}

export function ScreenFaculties({ navigation, route }) {

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
    <View>
      <FlatList data={faculties} renderItem={({item}) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Groups', { id_faculty: item.id_faculty, university_title: route.params.university_title })
          }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}

export function ScreenGroups({ navigation, route }) {
  
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
    <View>
      <FlatList data={groups} renderItem={({item}) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile', { group: item, university_title: route.params.university_title })
          }}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )
      }}></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})