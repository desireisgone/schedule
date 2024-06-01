import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: "center",
    padding: 10,
  },
  lesson: {
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '700',
    letterSpacing: 0.75,
    marginBottom: 10,
    padding: 5,
  },
  time: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Light',
    fontWeight: '500',
    letterSpacing: 0.60,
    padding: 5,
    alignSelf: "flex-end",
  },
  place: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Light',
    fontWeight: '500',
    letterSpacing: 0.30,
    alignSelf: "flex-end",
    padding: 5,
  },
  teacher: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '700',
    letterSpacing: 0.45,
    padding: 5,
  },
  type: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Medium',
    fontWeight: '500',
    letterSpacing: 0.60,
    padding: 5,
  },
  weektype: {
    color: '#63836b',
    // color: '#3d64ec',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '700',
    letterSpacing: 0.60,
    marginLeft: 20,
  }
})