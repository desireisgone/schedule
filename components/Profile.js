import React, { useState } from "react";
import {
  Image,
  View, 
  SafeAreaView, 
  Text,  
  StatusBar, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  TextInput 
} from "react-native";

//ну парс а не сгу пон да
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>СГУ им. Чернышевского</Text>
    </View>
  );
};

export default function Search() {
  return (
    <View style={styles.container}>
      <Header />
      {/* Дополнительный текст и кнопка */}
      <View style={styles.content}>
        <Text style={styles.additionalText}>Группа: 351</Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            //при нажатии на кнопку поменять группу былобыславно
          }}
        >
          <Text style={styles.buttonText1}>Сменить группу</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            //при нажатии на кнопку поменять группу былобыславно
          }}
        >
          <Text style={styles.buttonText2}>Оценить приложение</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button3}
          onPress={() => {
            //при нажатии на кнопку поменять группу былобыславно
          }}
        >
          <Text style={styles.buttonText3}>Поделиться приложением</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3D64EC",
    padding: 23,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Bold',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  additionalText: {
    color: "#3D64EC",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Medium',
  },
  button1: {
    backgroundColor: "#7393FF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
    elevation: 5, //тень
  },
  buttonText1: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  button2: {
    backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 350,
  },
  buttonText2: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  },
  button3: {
    backgroundColor: "#98AFFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText3: {
    color: "white",
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
  }
});