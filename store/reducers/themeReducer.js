import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../themes/themes";

const themeSlice = createSlice({
  name: 'themes',
  initialState: themes.blue,
  reducers: {
    setTheme(state, action) {
      state.colors = action.payload.colors
      state.dark = action.payload.dark
    }
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer