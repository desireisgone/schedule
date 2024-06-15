import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/store";

interface TitleHeaderProps {
  title: string;
}

export default function TitleHeader({ title }: TitleHeaderProps) {
  const { colors } = useSelector((state: RootReducer) => state.themeReducer)

  return (
    <View style={[styles.header, { backgroundColor: colors.maincolor }]}>
      <Text style={styles.header_text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '9%',
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    color: "white",
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Bold',
  },
})