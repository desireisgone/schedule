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
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import { Icon } from "../components/Icon";

export default function Notes() {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const [chosenDay, setChosenDay] = React.useState<number>(new Date().getDay());
  
  const onPressFunc = (newDay: number) => {
    setChosenDay(newDay);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.maincolor}/>
      <Header onPressFunc={onPressFunc} chosenDay={chosenDay}/>
      <View>
        <View style={[styles.searchbar, {backgroundColor: colors.light_for_search_and_daynumber}]}>
          <Icon name='search'/>
          <TextInput style={styles.textinput} placeholderTextColor="white" placeholder="Поиск" />
        </View>

        <TouchableOpacity style={{ left: 322 }}>
          <Text style={{ fontSize: 50, backgroundColor: colors.buttons_and_lessons }} >+</Text>
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
