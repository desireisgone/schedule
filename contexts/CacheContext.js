import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CacheContext = createContext()

export const useCache = () => {
  return useContext(CacheContext)
}

export const CacheProvider = ({ children }) => {
  const [groupId, setGroupId] = useState()

  const clearCache = async () => {
    await AsyncStorage.multiRemove(['user_university', 'user_group', 'user_schedule', 'user_id_group'])
    setGroupId(null)
  }

  return (
    <CacheContext.Provider value={{ clearCache, groupId, setGroupId }}>
      {children}
    </CacheContext.Provider>
  )
}
