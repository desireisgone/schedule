import React from "react";
import {
  View, 
  SafeAreaView, 
  Text, 
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import Header from "./Header";
import { useTheme } from "./ThemeContext";
import { themes } from '../styles/style';

export default function NewScreen() {
  const { currentTheme } = useTheme();

  const [chosenDay, setChosenDay] = React.useState(new Date().getDay());
  
  const onPressFunc = (newDay) => {
    setChosenDay(newDay);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={currentTheme.maincolor} />
      <Header onPressFunc={onPressFunc} currentTheme={currentTheme} chosenDay={chosenDay}/>
      <View>
        <View style={[styles.searchbar, {backgroundColor: currentTheme.light_for_search_and_daynumber}]}>
          <Image source={require("../assets/searchInput.png")}/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" />
        </View>

        <TouchableOpacity style={{ left: 322 }}>
          <Image
            style={{ width: 50, height: 50}}
            source={currentTheme === themes.green ? (require('../assets/plus_2.png')) : (require('../assets/plus.png'))}
          />
        </TouchableOpacity>
      </View>
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
  daySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  daySelectorItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
});
