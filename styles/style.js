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
    light_for_search_and_daynumber: '#a7c1ae',
    chosen_text: 'white',
    orange: '#b46e4c',
    white: 'white',
  },
  blue: {
    maincolor: '#3d64ec',
    buttons_and_lessons: '#7393ff',
    light_for_search_and_daynumber: '#98AFFF',
    chosen_text: 'black',
    orange: '#ffcd5b',
    white: 'white',
  },
  night: {
    maincolor: '#1c1c1c',
    buttons_and_lessons: '#3d3d3d',
    light_for_search_and_daynumber: '#969696',
    chosen_text: 'white',
    orange: '#e3e3e3',
    white: 'white',
  },
};
