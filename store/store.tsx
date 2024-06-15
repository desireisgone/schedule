import { configureStore, combineReducers } from "@reduxjs/toolkit"
import themeReducer from "./reducers/themeReducer"
import userDataReducer from "./reducers/userDataReducer"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  themeReducer,
  userDataReducer,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootReducer = ReturnType<typeof rootReducer>