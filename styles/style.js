import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  currentLesson: {
    backgroundColor: "#b46e4c",
  },
  main: {
    backgroundColor: "#63836b",
  },
  lesson: {
    backgroundColor: "#9ec1a7",
  }
})

export const themes = {
  green: {
    maincolor: '#63836b',
    buttons_and_lessons: '#9ec1a7',
    light_for_search_and_daynumber: 'white',
    orange: '#b46e4c',
  },
  blue: {
    maincolor: '#3d64ec',
    buttons_and_lessons: '#7393ff',
    light_for_search_and_daynumber: 'white',
    orange: '#ffcd5b',
  },
};
