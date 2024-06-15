import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_university: 'Университет не выбран',
  user_group: 'не выбрана',
  user_schedule: {},
  user_id_group: '',
}

const userDataSlice = createSlice({
  name: 'user_data',
  initialState,
  reducers: {
    setUserUniversity(state, action) {
      state.user_university = action.payload
    },
    setUserGroup(state, action) {
      state.user_group = action.payload
    },
    setUserSchedule(state, action) {
      state.user_schedule = action.payload
    },
    setUserIdGroup(state, action) {
      state.user_id_group = action.payload
    },
    resetAll(state) {
      state.user_group = initialState.user_group
      state.user_id_group = initialState.user_id_group
      state.user_schedule = initialState.user_schedule
      state.user_university = initialState.user_university
    }
  },
})

export const { setUserUniversity, setUserGroup, setUserSchedule, setUserIdGroup, resetAll } = userDataSlice.actions
export default userDataSlice.reducer