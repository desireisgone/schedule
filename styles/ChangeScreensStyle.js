import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 15,
    paddingHorizontal: 15,
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
  container: {
    flex: 1,
  },
  flatListContainer: {
    padding: 20,
    alignItems: "center",
  },
  optionItem: {
    padding: 10,
    borderRadius: 5,
    width: 350,
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'JetBrainsMono-Medium',
  },
})