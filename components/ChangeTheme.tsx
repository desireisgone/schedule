import React from "react";
import { Modal, FlatList, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { themes, getThemeInfo, themeTitles } from "../themes/themes";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../store/store";
import { setTheme } from "../store/reducers/themeReducer";

interface ThemeProps {
  title: string;
  dispatch: Function;
  setIsVisible: Function;
}

interface ChangeThemeProps {
  isVisible: boolean;
  setIsVisible: Function;
}

function Theme({ title, dispatch, setIsVisible }: ThemeProps) {
  const info = getThemeInfo(title)

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        dispatch(setTheme(themes[info.name]))
        setIsVisible(false)
      }}
    >
      <Image source={info.icon}/>
      <Text style={styles.title}>{themeTitles[info.name]}</Text>
    </TouchableOpacity>
  )
}

export default function ChangeTheme({ isVisible, setIsVisible }: ChangeThemeProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)
  const themeDispatch = useDispatch()

  return (
    <Modal 
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent={true}
    >
      <TouchableOpacity
        onPress={() => setIsVisible(false)}
        style={styles.background}
      >
        <TouchableOpacity style={[styles.modal, {backgroundColor: colors.background}]} activeOpacity={1}>
          <FlatList
            data={Object.keys(themes)}
            renderItem={({ item }) => <Theme title={item} dispatch={themeDispatch} setIsVisible={setIsVisible}/>}
            numColumns={2}
            style={styles.list} 
          />
        </TouchableOpacity>  
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'JetBrainsMono-Light',
    //fontSize: 15,
    //letterSpacing: -1,
  },
  item: {
    margin: 10,
    alignItems: 'center',
  },
  list: {
    alignSelf: 'center',
  },
  modal: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    borderRadius: 30,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
})