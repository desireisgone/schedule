import React from "react";
import {
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import TitleHeader from "../components/TitleHeader";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import { Icon } from "../components/Icon";

export default function Notes() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  //const [chosenDay, setChosenDay] = React.useState<number>(new Date().getDay());

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.maincolor}/>
      <TitleHeader title={"Задачи"}/>
      <View style={styles.options}>
        <View style={[styles.searchbar, {backgroundColor: colors.light_for_search_and_daynumber}]}>
          <Icon name='search' size={20} color='white'/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" />
        </View>
        <TouchableOpacity style={[styles.plus_button, { backgroundColor: colors.buttons_and_lessons }]}>
          <Icon name='plus' size={30} color='white'/>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  options: {
    paddingVertical: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    gap: 10
  },
  content: {

  },
  plus_button: {
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  searchbar: {
    flex: 1,
    display: "flex",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
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
});
