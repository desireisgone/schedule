import { configureStore, combineReducers } from "@reduxjs/toolkit"
import themeReducer from "./reducers/themeReducer"

const rootReducer = combineReducers({
  themeReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>