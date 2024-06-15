import React, { createContext, useContext, useState, Context } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  groupId: string;
  setGroupId: Function;
  clearCache: Function;
}

const CacheContext = createContext<ContextProps>({ groupId: '', setGroupId: () => {}, clearCache: () => {} })

export const useCache = () => {
  return useContext(CacheContext)
}

const getGroup = async () => {
  return await AsyncStorage.getItem('user_group')
}

export const CacheProvider = ({ children }: ProviderProps) => {
  const [groupId, setGroupId] = useState<string>('')

  const clearCache = async () => {
    await AsyncStorage.multiRemove(['user_university', 'user_group', 'user_schedule', 'user_id_group'])
    setGroupId('')
  }

  return (
    <CacheContext.Provider value={{ clearCache, groupId, setGroupId }}>
      {children}
    </CacheContext.Provider>
  )
}
